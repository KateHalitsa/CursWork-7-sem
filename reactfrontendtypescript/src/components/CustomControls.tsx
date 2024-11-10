import {Button, Col, Input, Label} from "reactstrap";
import React, {ChangeEventHandler} from "react";
import {Link} from "react-router-dom";
import {InputType} from "reactstrap/types/lib/Input";

export interface ISaveButtonProps {
    enabled?: boolean,
    onClick: () => void,
    caption?: string,
    color?: string;
}
const defaultSaveButtonProps = {
    enabled: true,
    caption: "Сохранить",
    color: "primary"
}
export const SaveButton = (props: ISaveButtonProps) => {
    props = { ...defaultSaveButtonProps, ...props }
    return (props.enabled) ? (
        <Button className="py-0 ms-1" size="sm" color={props.color} outline onClick={() => props.onClick()}>{props.caption}</Button>
    ):(
        <Button className="py-0 ms-1" size="sm" color="secondary" disabled outline>{props.caption}</Button>
    );
}

export interface ICloseButtonProps {
    to: string;
    dataChanged: boolean;
}
export const CloseButton = (props: ICloseButtonProps) => {
   const color = props.dataChanged ? "danger": "secondary";
   return  <Button size="sm" color={color} outline tag={Link} to={props.to} className="ms-1 py-0">Закрыть</Button>
}

export interface IInputWithLabelProps {
    id: string;
    value: string;
    label: string;
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined; // React.ChangeEvent<HTMLInputElement>
    type?: InputType;
    placeholder?: string;
}
const defaultInputWithLabelProps = {
    type: "text" as InputType
}
export const InputWithLabel = (props: IInputWithLabelProps) => {
    props = { ...defaultInputWithLabelProps, ...props }
    return <div className="row mb-1">
        <Label for={props.id} sm="2" size="sm" className="text-end pe-0">{props.label}</Label>
        <Col sm="10">
            <Input lang="ru-ru"  type={props.type} name={props.id} id={props.id} autoComplete="off" bsSize="sm"
                   placeholder={props.placeholder} complete="off"
                   value={props.value} onChange={props.onChange}/>
        </Col>
    </div>

}

export interface IErrorPanelProps {
    error: string;
}
export const ErrorPanel = (props: IErrorPanelProps) => {
    const errorMessage = props.error;
    const errorFound = errorMessage !== "";

    return (errorFound)?(
        <div className="row mb-1">
            <Label sm="2" size="sm"></Label>
            <Col sm="10">
                <div className="alert alert-danger mb-0 p-1 text-start ps-2 small" role="alert">
                    {errorMessage}
                </div>
            </Col>
        </div>
    ) : (
        <></>
    )
}