# aws-billing-daily-report

## Init

```bash
$ yarn
```

## Set environments

```bash
$ cp ./env.example.yml ./env.yml
```

- Set slack webhook url

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
