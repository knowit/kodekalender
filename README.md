[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# Installasjon
- Klon prosjektet fra [Ladder på kode.knowit.no](https://kode.knowit.no/users/alb_knowit.no/repos/ladder/): `git clone $LADDER_URL`
## Tjener
### Forberedelser
- **Om du ikke har Docker:** Last ned [Docker for Mac](https://docs.docker.com/docker-for-mac/) eller [Docker for Windows](https://docs.docker.com/docker-for-windows/install/) (Linux er pr. februar 2018 ikke på [Dockers Desktops liste over støttede plattformer](https://docs.docker.com/install/#supported-platforms))
- **Om du ikke har konto hos Graphcool**: [Registrer deg for Graphcool](https://console.graph.cool/login) 
- **Om du ikke har tilgang til [Programming Ladder-prosjektet i Graphcool](https://console.graph.cool/Programming%20Ladder/schema/types):**. Snakk med Aleksander Bjerkan for å få dette.
### Utførsel
- Installer avhengigheter for tjeneren:  `cd ladder/server && yarn && graphcool local up`
- Gå til siden for [autentisering på Graphcool-prosjektet](https://console.graph.cool/Programming%20Ladder/settings/authentication), kopier kommandoen for å autentisere deg (den skal se omtrent slik ut:  `graphcool login —token $TOKEN`) og kjør denne.
- Start utvikling med `graphcool deploy --target my-dev`
	* Gitt at du ikke får noen feil (se under), velg `shared-eu-west-1` i menyen som dukker opp. Du blir bedt om å skrive inn et navn på tjenesten. Kall den `my-dev` (eller noe annet; det har ikke så mye betydning). 
	* **Jeg får feilmeldingen `Cannot read property 'viewer' of undefined`:** Åpne `ladder/server/.graphcoolrc` dersom filen eksisterer. Sannsynligvis har du en linje i filen som begynner med `local: `. Slett denne linjen og gjenta kommandoen fra det overordnede punktet.
* Nå finner du administrasjonsgrensesnittet for denne Graphcool-instansen under [prosjektet `my-dev` på Graphcool-konsollen din](https://console.graph.cool/eiriks-dev/).
* På slutten av teksten som dukker opp i konsollen er det en liste med URL-er. Kopier URL-en som står etter `Simple API:`.
* Gå til `ladder/client/config.json` og erstatt verdien til nøkkelen `GRAPHCOOL_API_ENDPOINT` med `Simple API`-URL-en som du kopierte i forrige steg. 

## Klient
- Installer avhengigheter:  `cd ladder/client && yarn`
- Start tjener: `yarn run dev`


## CLIENT

```bash
$ cd client
$ now
$ now alias julekalender.now-id.now.sh julekalender.knowit.no
```

## BACKEND

GraphQL as a service, [Graphcool](https://www.graph.cool/)

```bash
$ cd server
$ graphcool deploy --target prod
```

### Auth0 integration

1. Login to your Auth0 Dashboard and select "Create API"
2. Enter a name, identifier and select "RS256"
3. Jot down the auth0 domain name, and the identifier/audience (from the
   previous step)
4. Set these values in `graphcool.yml`

5. Login to your Auth0 Dashboard and select "Create Client"
6. Select "Single Page Application"
7. Add "https://julekalender.knowit.com/auth/signed-in" as allowed callback URL.
8. Set the root "https://julekalender.knowit.com" as the allowed logout URLs.
9. In advanced settings, make sure "OIDC Conformant" is enabled.
10. In "Grant Types" only set "Implicit"
11. Set the identifier from the API steps as the audience for the lock

## AUTH

We use [Auth0](https://auth0.com/) for authentication. The JWTs are signed using
RS256

## LICENSE

MIT
