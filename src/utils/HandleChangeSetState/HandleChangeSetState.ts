export const HandleChangeSetState = (type: string, value: any, setForm: Function, form:any) => {
    if (value) setForm({ ...form, [`${type}`]: value })
    if (value == 0) value = ''
    setForm({ ...form, [`${type}`]: value })
}