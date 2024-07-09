# pgsql的代码片段
## 删除所有的sequence
```sql
  
DO $$  
DECLARE  
    seq_record RECORD;  
BEGIN  
    FOR seq_record IN SELECT sequence_name FROM information_schema.sequences where table_schema='public'  
  
    LOOP  
         raise notice '当前seq %',seq_record.sequence_name;  
  
        EXECUTE 'DROP SEQUENCE IF EXISTS ' || quote_ident(seq_record.sequence_name) || ' CASCADE;';  
    END LOOP;  
END;  
$$;
```

## 更改所有serial格式的id为identity

```sql
do $$  
    declare counter record;  
begin  
  for counter in SELECT table_name  
FROM information_schema.tables  where table_schema ='public' loop  
     begin  
    raise notice 'counter: %', counter.table_name;  
    -- execute  'alter table '||counter.table_name||' alter column id set default null;';
--     execute  'alter table '||counter.table_name||' alter column id drop  identity ;';  
execute  'alter table  '||counter.table_name||'   alter column id add generated always as identity;';  
    EXCEPTION WHEN others THEN  
            -- 这里处理异常，可以选择记录日志或执行其他操作  
            -- RAISE NOTICE 'Error occurred for i = %', i;            -- 继续执行下一个循环迭代          
              CONTINUE;  
    end;  
  end loop;  
end $$;
```

## 重置identity id的起始值

```sql
 SELECT pg_get_serial_sequence('table_name', 'column_name');  
  
ALTER SEQUENCE teacher_id_seq RESTART WITH 1;
```