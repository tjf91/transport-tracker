insert into receipts
(city,state,date_created,lat,lng,type,amount,total,trip_id)
values
($1,$2,$3,$4,$5,$6,$7,$8,$9)
returning *;
