export type MainDataType = {
    editMode: boolean
    avatar: string
    display_name: string
}

export type ButtonsDataType = {
    editMode: boolean
    quit: string
    buttonLabel: string
}

export type ProfilePasswordRowType = {
    label: string
    name: string
    type: 'password'
    firstChild?: boolean
}

export type ProfileInfoRowType = {
    label: string
    name: string
    value: string
    type: string
    firstChild?: boolean
}

export type ProfileInfoType = {
    editMode: boolean
    rows: Array<ProfileInfoRowType | ProfilePasswordRowType>
}

export type RenderProfileType = (editMode?: boolean, editPassword?: boolean) => void;
export type ChangeInfoType = (e: MouseEvent) => void;
export type ChangePasswordType = ChangeInfoType;
export type SaveChangesType = () => void;
