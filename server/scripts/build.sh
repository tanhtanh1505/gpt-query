if [ -f gpt-query-prod.tar ]; then
    bash scripts/remove.sh
fi

cd ../client
npm run build

cp -r build ../server/

cd ../server

docker compose up -d

docker save gpt-query-prod > gpt-query-prod.tar