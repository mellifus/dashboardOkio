Labeled horizontal bar for ranked lists — top treatments by share, staff utilization %.

```jsx
{treatments.map(t => <ProgressBar key={t.name} label={t.name} pct={t.pct} />)}
```
