const SUPABASE_URL = 'https://oagopvpculzzhtlwyrmj.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || 'sb_publishable_hyo7UVWyvXAd2GCtcZ1C6A_2PMY9hLJ';

async function supabaseQuery(table: string, method: string, data?: any, filters?: any) {
  let url = `${SUPABASE_URL}/rest/v1/${table}`;
  
  if (filters) {
    const filterStr = Object.entries(filters)
      .map(([key, value]) => `${key}=eq.${value}`)
      .join('&');
    url += `?${filterStr}`;
  }

  const options: any = {
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
    },
  };

  if (method === 'POST') {
    options.method = 'POST';
    options.body = JSON.stringify(data);
  } else if (method === 'PATCH') {
    options.method = 'PATCH';
    options.body = JSON.stringify(data);
  } else {
    options.method = 'GET';
  }

  const response = await fetch(url, options);
  const result = await response.json();
  
  if (!response.ok) {
    throw new Error(result.message || 'Database error');
  }

  return result;
}

export async function query(table: string, filters?: any) {
  return supabaseQuery(table, 'GET', undefined, filters);
}

export async function queryOne(table: string, filters?: any) {
  const results = await supabaseQuery(table, 'GET', undefined, filters);
  return results[0] || null;
}

export async function execute(table: string, data: any, method: string = 'POST') {
  return supabaseQuery(table, method, data);
}

export async function initDb(): Promise<void> {
  // Tables already created in Supabase
}