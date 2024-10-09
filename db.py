import sqlite3
import pandas as pd

# Load the two datasets into Pandas DataFrames
oil_data_file = 'filtered_oil_data.csv'   # Update with the actual path
tele_data_file = 'filtered_tele_data.csv' # Update with the actual path

df_oil = pd.read_csv(oil_data_file)
df_tele = pd.read_csv(tele_data_file)

# Connect to (or create) the SQLite database
conn = sqlite3.connect('project_database.db')

# Write the oil data to a new table 'oil_data'
df_oil.to_sql('oil_data', conn, if_exists='replace', index=False)

# Write the telecom data to a new table 'tele_data'
df_tele.to_sql('tele_data', conn, if_exists='replace', index=False)

# Query the database to ensure data was written correctly
# Display the first 5 records from each table
query_oil = "SELECT * FROM oil_data LIMIT 5;"
result_oil = pd.read_sql(query_oil, conn)

query_tele = "SELECT * FROM tele_data LIMIT 5;"
result_tele = pd.read_sql(query_tele, conn)

# Display the results
print("Oil Data Sample:")
print(result_oil)

print("\nTelecom Data Sample:")
print(result_tele)

# Always close the connection when done
conn.close()