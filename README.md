# Prosperity Discord Bot

It's a Discord bot, dumbass

## Prerequisites

- Yarn i think?? `npm install -g yarn`
- ts-node `npm install -g ts-node`

## Setup

`yarn install`

```bash
tee ./.env << EOF > /dev/null
TOKEN={insert token here}
ID={insert id here}
EOF
```

## Run

`ts-node main.ts`

## Register Slash Commands

`ts-node register.ts`