FROM golang:1.14 as builder

WORKDIR /app

COPY go.* ./

RUN go mod download

COPY . ./

RUN CGO_ENABLED=0 GOOS=linux go build -v -o server

FROM alpine:3

RUN apk add --no-cache ca-certificates

COPY --from=builder /app/server /server

COPY static/ ./static/

COPY templates/ ./templates/

COPY data/ ./data/

EXPOSE 8080

CMD ["/server"]