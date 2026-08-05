Generic bordered-top row: optional leading element (Dot/Avatar), title + subtitle, trailing element (Badge/Button). Backs the client list, follow-up queue rows, and request-queue rows.

```jsx
<ListRow title="Elena Vidal" subtitle="Última visita 12 jul" trailing={<Badge tone="accent" uppercase>VIP</Badge>} onClick={() => selectClient("c1")} />
```
