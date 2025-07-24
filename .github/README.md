# GitHub Actions CI Pipeline

Questo workflow automatizza la pipeline di **Continuous Integration** per il progetto HomeCloud.

> **ℹ️ Build & Deploy**: Gestiti automaticamente da **AWS Amplify** ad ogni push su `main`  
> Questa pipeline CI si concentra su **qualità del codice** e **validazione**.

## 🚀 Trigger

La pipeline si attiva automaticamente per:

- ✅ **Push** su branch `main`
- ✅ **Pull Request** verso `main`

## 🔧 Jobs della Pipeline

### 1. **Setup & Install Dependencies**

- Configura Node.js 18 e pnpm 8
- Cache intelligente delle dipendenze
- Installazione con `pnpm install --frozen-lockfile`

### 2. **Lint Code**

- ESLint per il controllo qualità del codice
- Verifica formattazione Prettier (se configurato)
- **Fallisce** se ci sono errori di linting

### 3. **Test Frontend**

- Esegue tutti i test React con Jest
- Genera report di copertura del codice
- Carica artifacts per analisi

### 4. **Test Backend Functions**

- Valida la struttura delle funzioni Lambda AWS
- Prepara l'infrastruttura per test futuri
- **Non fallisce** la pipeline (informativo)

### 5. **Security Scan** (parallelo, solo per main/PR)

- Audit delle dipendenze npm/pnpm
- Scansione per secrets nel codice
- **Solo** per PR e push su main

### 6. **Amplify Validation** (parallelo, solo per main/PR)

- Verifica configurazione AWS Amplify
- Controlla sintassi file JSON
- Lista funzioni Lambda disponibili

### 7. **Pipeline Summary** (finale)

- Genera report finale con stato di tutti i job
- Visibile nella tab "Summary" di GitHub Actions

## 📊 Status e Artifacts

La pipeline genera:

- **Coverage Report**: `coverage/` (7 giorni)
- **Pipeline Summary**: Report finale con tutti gli stati

> **ℹ️ Build & Deploy**: Gestiti automaticamente da AWS Amplify

## 🔄 Flusso di Lavoro

````mermaid
graph TD
    A[Push/PR] --> B[Setup]
    B --> C[Lint]
    B --> D[Frontend Tests]
    B --> E[Backend Tests]
    B --> F[Security Scan]
    B --> G[Amplify Validation]

    C --> H[Summary]
    D --> H
    E --> H
    F --> H
    G --> H

    H --> I[AWS Amplify Auto-Deploy]
    I --> J[✅ Production]
```## ⚡ Ottimizzazioni

- **Cache pnpm**: Velocizza installazioni ripetute
- **Jobs paralleli**: Setup, lint, test e security girano in parallelo
- **Condizioni smart**: Build solo se lint/test passano
- **Artifacts ottimizzati**: Retention di 7 giorni

## 🛠 Estensioni Future

### Backend Testing

```bash
# Aggiungere test per funzioni Lambda
mkdir -p .github/tests/backend/unit
# Esempio: createDeadline.test.js, readUsers.test.js, etc.
````

### Multi-Environment Deploy

```yaml
# Aggiungere job per deploy staging/production
deploy-staging:
  if: github.ref == 'refs/heads/develop'
  # Deploy logic
```

### Performance Testing

```yaml
# Aggiungere Lighthouse CI
lighthouse:
  needs: build
  # Performance analysis
```

## 🚨 Troubleshooting

### Pipeline fallisce al Lint

```bash
# Locale: Fix errori ESLint
npx eslint src/ --fix
```

### Test falliscono

```bash
# Locale: Run test in modalità interattiva
pnpm test
```

### Build fallisce

```bash
# Locale: Test build
pnpm run build
```

### Security scan rileva vulnerabilità

```bash
# Fix dipendenze vulnerabili
pnpm audit --fix
```

## 📝 Configurazione Consigliata

### ESLint (già configurato)

Il progetto usa `eslint-config-react-app` - configurazione ottimale per React.

### Prettier (opzionale)

```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

### VS Code Settings

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## 🎯 Next Steps

1. **Commit** questo workflow
2. **Crea una PR** per testare la pipeline
3. **Verifica** che tutti i job passino
4. **Estendi** con test backend quando necessario

---

> **Nota**: La pipeline è progettata per essere **non-bloccante** per il workflow di sviluppo, ma **rigorosa** per la qualità del codice in produzione.
