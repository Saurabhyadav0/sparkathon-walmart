import sys
import pandas as pd
from main_model_script import SmartInventoryOptimizer

# Usage: python predict.py data.csv --retrain
data_file = "data.csv"
for arg in sys.argv[1:]:
    if arg.endswith(".csv"):
        data_file = arg

print(f"📊 Using data file: {data_file}")
optimizer = SmartInventoryOptimizer(data_file)
optimizer.preprocess_and_encode_data()

if "--retrain" in sys.argv:
    print("🔄 Forcing retrain...")
    optimizer.train_models()
else:
    optimizer.load_models()
    if optimizer.transfer_model is None or optimizer.action_model is None:
        print("⚠️ No models found. Training from scratch...")
        optimizer.train_models()

print("🚀 Generating recommendations...")
recommendations = optimizer.generate_recommendations()

if recommendations.empty:
    print("❌ No recommendations generated. Check data or retrain.")
else:
    recommendations.to_csv("output.csv", index=False)
    print(f"✅ Saved predictions to output.csv")
    print(recommendations.head())
