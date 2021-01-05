# aws-billing-daily-report

## Init

```bash
$ yarn
```

## Set environments

```bash
$ cp ./env.example.yml ./env.yml
```

- Set slack webhook url & channel name to env.yml

## Build

```bash
$ yarn build
```

## Deploy

```bash
$ sls deploy
```

## Debug

```bash
# production
$ sls invoke -f create
# local
$ sls invoke local -f create
```
