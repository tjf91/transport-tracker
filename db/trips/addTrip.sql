insert into trips
(name,date_start,date_end,total_spent,company_id,driver_d_id,status)
values
($1,$2,$3,$4,$5,$6,$7)
returning *;