## Supabase 設定

SQL Editor > 用指令建立資料表、設定權限

建立資料表

```= SQL
CREATE TABLE results (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50),
  score INTEGER,
  seconds INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);
```

Database 可以看是否建立成功

---

設定權限為公開讀寫

```= SQL
ALTER TABLE results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "公開讀取" ON results FOR SELECT USING (true);
CREATE POLICY "公開寫入" ON results FOR INSERT WITH CHECK (true);
```

Authentication > Policies 可以看是否建立成功

---

API DOC
https://mppeidnqpcynpvguishh.supabase.co/project/mppeidnqpcynpvguishh/api
方便閱讀就用 https://editor.swagger.io/ 把剛剛的 JSON 貼上
或是登入到 Supabase > API Docs > TABLES AND VIEWS > results
