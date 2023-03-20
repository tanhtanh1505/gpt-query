if [ -f gpt-query-prod.tar ]; then
    bash scripts/remove.sh
fi

cd ../client
sed -i 's/http:\/\/localhost:8080/https:\/\/gpt.tanhuet.site/g' .env
npm run build
sed -i 's/https:\/\/gpt.tanhuet.site/http:\/\/localhost:8080/g' .env

cp -r build ../server/

cd ../server

docker compose up -d

docker save gpt-query-prod > gpt-query-prod.tar