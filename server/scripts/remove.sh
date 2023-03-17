docker stop gpt_query_prod
docker rm -f gpt_query_prod

docker rmi -f gpt-query-prod:1.0.0

if [ -f gpt-query-prod.tar ]; then
    rm gpt-query-prod.tar
fi