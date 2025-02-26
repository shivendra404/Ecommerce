import React from 'react'
import { Label } from '../ui/Label'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/Select'
import { Textarea } from '../ui/textarea'

function CommonForm({ formControls, formData, setFormData, onSubmit, buttonText, isBtnDisabled }) {

    function renderInputsByComponentType(getControlItem) {
        let element = null;
        const value = formData[getControlItem.name] || "";

        switch (getControlItem.componentType) {
            case "input":
                element = (
                    <Input
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        type={getControlItem.type}
                        value={value}
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                [getControlItem.name]: event.target.value,
                            })
                        }
                    />
                );

                break;
            case "select":
                element = (
                    <Select
                        onValueChange={(value) =>
                            setFormData({
                                ...formData,
                                [getControlItem.name]: value,
                            })
                        }
                        value={value}
                    >
                        <SelectTrigger className="w-full bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <SelectValue placeholder={getControlItem.label} />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-300 rounded">
                            {getControlItem.options && getControlItem.options.length > 0
                                ? getControlItem.options.map((optionItem) => (
                                    <SelectItem key={optionItem.id} value={optionItem.id}>
                                        {optionItem.label}
                                    </SelectItem>
                                ))
                                : null}
                        </SelectContent>
                    </Select>
                );

                break;
            case "textarea":
                element = (
                    <Textarea
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.id}
                        value={value}
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                [getControlItem.name]: event.target.value,
                            })
                        }
                    />
                );

                break;

            default:
                element = (
                    <Input
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        type={getControlItem.type}
                        value={value}
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                [getControlItem.name]: event.target.value,
                            })
                        }
                    />
                );
                break;
        }

        return element;
    }
    return (
        <form onSubmit={onSubmit}>
            <div className='flex flex-col gap-3'>

                {
                    formControls.map(controlItem => {
                        return <div className='grid w-full gap-1.5' key={controlItem.name}>
                            <Label className="mb-1" >{controlItem.label}</Label>
                            {
                                renderInputsByComponentType(controlItem)
                            }
                        </div>
                    })
                }
            </div>
            <Button disabled={isBtnDisabled} type="submit" className="mt-2 w-full">
                {buttonText || "Submit"}
            </Button>
        </form>
    )
}

export default CommonForm
