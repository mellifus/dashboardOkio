Single row in the dark left sidebar — a small dot, label, and optional unread-count badge.

```jsx
<NavItem label="Centro de Solicitudes" active badge={4} onClick={() => setView("conversations")} />
```

Only ever used inside the dark sidebar surface (`--surface-sidebar`); dot and text colors are pre-tuned for that background.
