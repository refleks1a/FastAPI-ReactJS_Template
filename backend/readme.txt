# Create a virtual environment Python
python3 -m venv env

# Activate the virtual environment
# Windows
.\env\Scripts\activate
# Linux
source env/bin/activate

# Leave the virtual environment
deactivate

# Freeze the virtual environment packages
pip freeze -l > requirements.txt 

# Install requirements
pip install -r requirements.txt

# Run server FastApi
uvicorn main:app --reload   
