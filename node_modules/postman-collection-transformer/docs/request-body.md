# Transforming Request Body (v1 -> v2.x)

### Request Body Mode

> v1 property: requests.dataMode
v2 property: request.body.mode


**`mode` is set based on the following conversion table:**

| v1         | v2         |
|------------|------------|
| binary     | file       |
| graphql    | graphql    |
| params     | formdata   |
| raw        | raw        |
| urlencoded | urlencoded |

**Note**
1. If `dataMode` is explicitly set to null then `body` will be set to `null`
2. If `dataMode` is not set or invalid then `mode` is inferred from `rawModeData` or `data` or `graphqlModeData`
3. If multiple types of body are set e.g, both `rawModeData` and `graphqlModeData` are set. Then mode selection priority will be: `raw → formdata → graphql` (pre-graphql behavior).

- `formdata`: if `isRawModeData` is false AND `data` is an array
- `graphql`: if `isRawModeData` is false AND `graphqlModeData` is non empty
- `raw`: otherwise

```
isRawModeData:
- `rawModeData` is not null `AND`
- `rawModeData` is of type string `OR`
- `rawModeData` is an array of length 1 and the element is of type string
```

---

### Request Body Data

> v1 property: requests.data or requests.rawModeData
v2 property: request.body[request.body.mode]

**Mode: raw**
```javascript
if (isRawModeData) {
    body.raw = Array.isArray(v1.rawModeData) ? v1.rawModeData[0] : v1.rawModeData;
}
else if (typeof v1.data === 'string') {
    body.raw = v1.data;
}
```

**Mode: file**
```javascript
body.file = { src: v1.rawModeData }
```

**Mode: graphql**
```javascript
body.graphql = v1.graphqlModeData;
```

**Mode: formdata**
```javascript
body.formdata = parseFormData (v1.data || v1.rawModeData, retainEmpty);
```

**Mode: urlencoded**
```javascript
body.urlencoded = parseFormData (v1.data || v1.rawModeData, retainEmpty);
```

**parseFormData**: [source](https://github.com/postmanlabs/postman-collection-transformer/blob/v3.0.0/lib/converters/v1.0.0/converter-v1-to-v2.js#L30)