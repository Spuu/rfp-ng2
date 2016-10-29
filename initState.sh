#/bin/bash

mocha

for ean in `shuf -i 1000000000000-9999999999999 -n 3`; do curl --data "ean=$ean&name=Produkt%20$ean" http://localhost:3000/api/product; done
