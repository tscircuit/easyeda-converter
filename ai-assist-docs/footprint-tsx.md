## This is example usage of `<footprint />` tsx

```tsx
const Circuit = () => (
  <component
    name="K"
    footprint={
      <footprint>
        <platedhole
          x="-3mm"
          y={0}
          hole_diameter="1mm"
          outer_diameter="2mm"
          port_hints={["left", "1"]}
        />
        <smtpad
          x="3mm"
          y={0}
          width="3mm"
          height="3mm"
          shape="rect"
          port_hints={["right", "2"]}
        />
      </footprint>
    }
  />
)
```
