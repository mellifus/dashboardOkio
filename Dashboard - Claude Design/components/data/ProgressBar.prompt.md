Labeled horizontal bar for ranked lists, such as top treatments by share or staff utilization %.

```jsx
{treatments.map(t => <ProgressBar key={t.name} label={t.name} pct={t.pct} />)}
```
