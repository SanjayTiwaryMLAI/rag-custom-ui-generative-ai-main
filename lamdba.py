import json
import boto3
from datetime import datetime, timedelta

dynamodb_client = boto3.client('dynamodb')

def insert_dynamo_record(event):
    current_datetime = datetime.now()
    one_week_ahead_epoch = int((datetime.now() + timedelta(minutes=10080)).timestamp())
    current_time_epoch = int(datetime.now().timestamp())
    response = dynamodb_client.put_item(
        TableName='rag_chatbot_feeback_table',
        Item={
            'session_date': {'S': str(current_datetime)},
            'session_id': {'S': event["sessionId"]},
            'feedback': {'N': str(event["feedback"])},  # Convert to string before storing in DynamoDB
            'llm_response': {'S': event['answer']},
            'question': {'S': event["question"]}
        }
    )

def lambda_handler(event, context):
    print("payload from ui", event)
    insert_dynamo_record(event)

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*'
        },
        'body': json.dumps({"message": 'Hello from Lambda!'})
    }