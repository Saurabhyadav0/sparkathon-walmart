import pandas as pd
import numpy as np
import datetime
import joblib
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import LabelEncoder

class SmartInventoryOptimizer:
    def __init__(self, file_path: str):
        print(f"📥 Loading data from: {file_path}")
        self.data = pd.read_csv(file_path)
        self.transfer_model = None
        self.action_model = None
        self.quantity_model = None
        self.label_encoder = LabelEncoder()

        # Parse dates safely
        self.data['ExpiryDate'] = pd.to_datetime(self.data['ExpiryDate'], errors='coerce', dayfirst=True)
        self.data['ArrivalDate'] = pd.to_datetime(self.data['ArrivalDate'], errors='coerce', dayfirst=True)
        self.data.dropna(subset=['ExpiryDate'], inplace=True)

    def preprocess_and_encode_data(self):
        print("🛠 Preprocessing and feature engineering...")
        reference_date = datetime.datetime(2025, 6, 22)
        self.data['DaysUntilExpiry'] = (self.data['ExpiryDate'] - reference_date).dt.days.clip(lower=0)
        self.data['UrgencyScore'] = 1 / (self.data['DaysUntilExpiry'] + 1)
        self.data['StockVelocity'] = self.data['StockQty'] / (self.data['DailySaleAvg'] + 0.01)

        avg_sales = self.data.groupby('ItemName')['DailySaleAvg'].transform('mean')
        self.data['DemandRatio'] = self.data['DailySaleAvg'] / (avg_sales + 0.01)

        # Set RecommendedAction
        conditions = [
            (self.data['DaysUntilExpiry'] <= 0),
            (self.data['DaysUntilExpiry'] <= 3),
            (self.data['DaysUntilExpiry'] <= 7),
            (self.data['DaysUntilExpiry'] > 7)
        ]
        choices = ['donate', 'discount', 'monitor', 'none']
        self.data['RecommendedAction'] = np.select(conditions, choices, default='none')

        # Mark transfer eligible
        self.data['ShouldTransfer'] = np.where(
            (self.data['DemandRatio'] < 0.8) & 
            (self.data['DaysUntilExpiry'] > 7) &
            (~self.data['IsSpoiled']) &
            (self.data['OnPromotion'] == 'No'), 1, 0
        )

        # Compute quantities
        self.data['ActionQuantity'] = self.data.apply(
            lambda row: int(row['StockQty'] *
                (1.0 if row['RecommendedAction'] == 'donate' else
                 0.7 if row['RecommendedAction'] == 'discount' else
                 0.3 if row['RecommendedAction'] == 'monitor' else 0.0)),
            axis=1
        )

        # One-hot encode actions
        for action in ['donate', 'none', 'monitor', 'discount']:
            self.data[f'RecommendedAction_{action}'] = (self.data['RecommendedAction'] == action).astype(int)

        # Encode top stores
        top_stores = self.data['StoreID'].value_counts().nlargest(10).index.tolist()
        for store_id in top_stores:
            self.data[f'StoreID_{store_id}'] = (self.data['StoreID'] == store_id).astype(int)

        # Frequency encode ItemName
        self.data['ItemName_FrequencyEncoded'] = self.data['ItemName'].map(
            self.data['ItemName'].value_counts(normalize=True)
        )

        # One-hot encode Category
        for category in self.data['Category'].unique():
            self.data[f'Category_{category}'] = (self.data['Category'] == category).astype(int)

        # Encode other binary
        self.data['OnPromotion_Encoded'] = (self.data['OnPromotion'] == 'Yes').astype(int)
        self.data['TemperatureSensitive_Encoded'] = self.data['TemperatureSensitive'].astype(int)

        # Drop unused
        self.data.drop(columns=['SuggestedAction', 'Brand', 'Zone', 'TemperatureSupport',
                                'OnPromotion', 'TemperatureSensitive'], inplace=True, errors='ignore')

    def train_models(self):
        print("🚀 Training models...")
        numerical = ['StockQty', 'DailySaleAvg', 'SpoilageChance', 'DaysUntilExpiry',
                     'UrgencyScore', 'StockVelocity', 'DemandRatio',
                     'DistanceToNearestStore', 'AvgDailySaleInNearbyStores']
        encoded = [col for col in self.data.columns if col.startswith(('RecommendedAction_', 'StoreID_', 'Category_'))]
        encoded += ['ItemName_FrequencyEncoded', 'OnPromotion_Encoded', 'TemperatureSensitive_Encoded']
        features = [f for f in numerical + encoded if f in self.data.columns]

        df = self.data.dropna(subset=features + ['ShouldTransfer', 'RecommendedAction', 'ActionQuantity']).copy()
        if df.empty:
            print("❌ No data to train on.")
            return

        # Transfer model
        X_t, y_t = df[features], df['ShouldTransfer']
        X_train_t, X_test_t, y_train_t, y_test_t = train_test_split(X_t, y_t, test_size=0.2, random_state=42)
        self.transfer_model = RandomForestClassifier(random_state=42, class_weight='balanced')
        self.transfer_model.fit(X_train_t, y_train_t)
        print("✅ Transfer model accuracy:", accuracy_score(y_test_t, self.transfer_model.predict(X_test_t)))

        # Action model
        df_action = df[df['ShouldTransfer'] == 0]
        if df_action.empty:
            print("⚠️ No data for action prediction.")
            return
        X_a, y_a = df_action[features], df_action['RecommendedAction']
        y_a_encoded = self.label_encoder.fit_transform(y_a)
        X_train_a, X_test_a, y_train_a, y_test_a = train_test_split(X_a, y_a_encoded, test_size=0.2, random_state=42)
        self.action_model = RandomForestClassifier(random_state=42)
        self.action_model.fit(X_train_a, y_train_a)

        # Quantity model
        df_qty = df_action[df_action['RecommendedAction'] != 'none']
        if df_qty.empty:
            print("⚠️ No data for quantity model.")
            return
        X_q, y_q = df_qty[features], df_qty['ActionQuantity']
        X_train_q, X_test_q, y_train_q, y_test_q = train_test_split(X_q, y_q, test_size=0.2, random_state=42)
        self.quantity_model = RandomForestRegressor(random_state=42)
        self.quantity_model.fit(X_train_q, y_train_q)

        # Save models
        self.save_models()

    def save_models(self):
        print("💾 Saving models...")
        joblib.dump(self.transfer_model, "transfer_model.pkl")
        joblib.dump(self.action_model, "action_model.pkl")
        joblib.dump(self.quantity_model, "quantity_model.pkl")
        joblib.dump(self.label_encoder, "label_encoder.pkl")

    def load_models(self):
        try:
            self.transfer_model = joblib.load("transfer_model.pkl")
            self.action_model = joblib.load("action_model.pkl")
            self.quantity_model = joblib.load("quantity_model.pkl")
            self.label_encoder = joblib.load("label_encoder.pkl")
            print("✅ Loaded models from disk.")
        except:
            print("⚠️ Could not load models. Retrain may be required.")

    def generate_recommendations(self):
        if self.transfer_model is None:
            print("⚠️ Models not trained.")
            return pd.DataFrame()
        num_cols = ['StockQty', 'DailySaleAvg', 'SpoilageChance', 'DaysUntilExpiry',
                    'UrgencyScore', 'StockVelocity', 'DemandRatio',
                    'DistanceToNearestStore', 'AvgDailySaleInNearbyStores']
        cat_cols = [col for col in self.data.columns if col.startswith(('RecommendedAction_', 'StoreID_', 'Category_'))]
        cat_cols += ['ItemName_FrequencyEncoded', 'OnPromotion_Encoded', 'TemperatureSensitive_Encoded']
        features = [f for f in num_cols + cat_cols if f in self.data.columns]

        df_pred = self.data.dropna(subset=features).copy()
        X = df_pred[features]
        transfers = self.transfer_model.predict(X)

        results = []
        for i, row in df_pred.iterrows():
            rec = {
                'ItemName': row['ItemName'],
                'CurrentStore': row['StoreLocation'],
                'StoreID': row['StoreID'],
                'StockQty': row['StockQty'],
                'DaysUntilExpiry': row['DaysUntilExpiry']
            }
            if transfers[X.index.get_loc(i)] == 1:
                rec['Recommendation'] = 'TRANSFER'
                rec['TargetStore'] = 'Nearby High-Demand Store'
                rec['TransferQty'] = int(row['StockQty'] * 0.5)
            else:
                encoded_pred = self.action_model.predict(X.loc[[i]])[0]
                action = self.label_encoder.inverse_transform([encoded_pred])[0]
                rec['Recommendation'] = action.upper()
                if action != 'none' and self.quantity_model is not None:
                    qty = int(self.quantity_model.predict(X.loc[[i]])[0])
                    rec['ActionQty'] = qty
                    rec['ActionPct'] = f"{(qty / row['StockQty']) * 100:.1f}%" if row['StockQty'] > 0 else "0%"
                else:
                    rec['ActionQty'] = 0
                    rec['ActionPct'] = "0%"
            results.append(rec)
        return pd.DataFrame(results)
