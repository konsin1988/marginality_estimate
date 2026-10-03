FROM golang:1.26-alpine AS builder

WORKDIR /app

COPY ./api/go.mod /app/ 
RUN go mod download

COPY ./api .

RUN go build -o api .

FROM alpine:3.20

WORKDIR /app

COPY --from=builder /app/api .
COPY ./api/migrations /app/migrations

RUN apk add --no-cache git curl tzdata

EXPOSE 8000

CMD ["./api"]
