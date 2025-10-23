import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Управление кодовыми сниппетами (получение и создание)
    Args: event - dict с httpMethod, body, queryStringParameters
          context - объект с request_id и другими атрибутами
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    database_url = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(database_url)
    cur = conn.cursor()
    
    if method == 'GET':
        cur.execute("SELECT id, title, language, code, tags, created_at FROM code_snippets ORDER BY created_at DESC")
        rows = cur.fetchall()
        
        snippets = []
        for row in rows:
            snippets.append({
                'id': row[0],
                'title': row[1],
                'language': row[2],
                'code': row[3],
                'tags': row[4] if row[4] else [],
                'created_at': row[5].isoformat() if row[5] else None
            })
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'snippets': snippets}),
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        
        title = body_data.get('title', '')
        language = body_data.get('language', '')
        code = body_data.get('code', '')
        tags = body_data.get('tags', [])
        
        if not title or not language or not code:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Title, language and code are required'}),
                'isBase64Encoded': False
            }
        
        cur.execute(
            "INSERT INTO code_snippets (title, language, code, tags) VALUES (%s, %s, %s, %s) RETURNING id",
            (title, language, code, tags)
        )
        snippet_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 201,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'id': snippet_id, 'message': 'Snippet created successfully'}),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
