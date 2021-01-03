insert into trips
(name,date_start,date_end,total_spent,company_id,driver_d_id)
values
($1,$2,$3,$4,$5,$6)
returning *;