FROM python:3.12.3

COPY requirements.txt . 
RUN pip install -r requirements.txt

COPY . .

CMD gunicorn src.main:app --workers 1 --worker-class uvicorn.workers.UvicornWorker --bind=0.0.0.0:8000