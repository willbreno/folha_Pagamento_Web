'use client'
import { BtnBack } from "@/Components/Buttons/BtnBack/BtnBack";
import { BtnEdit } from "@/Components/Buttons/BtnEdit/BtnEdit";
import { BtnSave } from "@/Components/Buttons/BtnSave/BtnSave";
import { Toast } from 'primereact/toast';
import { Input } from "@/Components/Input/Input";
import { saira } from "@/utils/ChangeFont";
import { useEffect, useRef } from 'react'
import { message } from "@/utils/mensagesToast/message";
import { useBuscarPorMatricula } from "@/hooks/useBuscarPorMatricula";
import { useState } from 'react'
import { formataCaracteres } from "@/utils/formataCaracteres/formataCaracteres";
import { LoadingComponent } from "@/Components/LoadingComponent/LoadingComponent";
import { handleFileInputChange } from "@/utils/ConverterImageBase64/ConverterImageBase64";
import { SelectInput } from "@/Components/SelectInput/SelectInput";
import { HandleChangeSetState } from "@/utils/HandleChangeSetState/HandleChangeSetState";
import { CadastraFuncionarioGeralProps, CadastraFuncionarioProps } from "@/TypesObjects/FormCadastraFuncionarios/FormCadastraFuncionarios";
import { CadastroEnderecoProps } from "@/TypesObjects/FormEndereco/FormEndereco";
import { CadastroEmailProps, CadastroTelefoneProps } from "@/TypesObjects/FormTelefoneEmail/FormTelefoneEmail";
import { GenersOptions } from "@/TypesObjects/GeneroType/GeneroType";
import { EstadoCivilOptions } from "@/TypesObjects/EstadoCivilType/EstadoCivilType";
import { SelectDepartamento } from "@/utils/SelectDepartamento/SelectDepartamento";
import { useBuscarTodosDepartamento } from "@/hooks/useBuscarTodosDepartamento";
import { SelectCargo } from "@/utils/SelectCargo/SelectCargo";
import { useBuscarCargos } from "@/hooks/useBuscarTodosCargos";
import { useBuscarEndereco } from "@/hooks/useBuscarEndereco";
import { useBuscarEmail } from "@/hooks/useBuscarEmail";
import { useBuscarTelefone } from "@/hooks/useBuscarTelefone";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchFuncionario } from "@/api/patch/patchFuncionario/patchFuncionario";
import { useBuscarCargo } from "@/hooks/useBuscarCargo";
import { BtnInactive } from "@/Components/Buttons/BtnInactive/BtnInactive";
import { BtnActive } from "@/Components/Buttons/BtnActive/BtnActive";
import { useValidateToken } from "@/hooks/useValidateToken";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { matricula: number } }) {
    const sendResquest = () => { }
    const DataDepartamento = useBuscarTodosDepartamento()
    const toast = useRef(null);
    const { data, Fetching, Loading, Error } = useBuscarPorMatricula(params.matricula)
    const DataEndereco = useBuscarEndereco(Number(data?.matricula))
    const DataEmail = useBuscarEmail(Number(data?.matricula))
    const DataTelefone = useBuscarTelefone(Number(data?.matricula))
    const [unlockOfInput, setUnlockOfInput] = useState(true)
    const handleUnlockOfInput = () => {
        setUnlockOfInput(!unlockOfInput)
    }
    const [file, setFile] = useState<File | null>(null);
    const [base64URL, setBase64URL] = useState<string>('');
    const [formUpdate, setFormUpdate] = useState<DataUserType | undefined | CadastraFuncionarioProps>({ fkStatus: 1, sexo: "M", fkNvlAcesso: 2, fkAcesso: 1, senha: "123456", fkEmpresa: 1, })
    const [formUpdateEndereco, setFormUpdateEndereco] = useState<CadastroEnderecoProps>()
    const [formUpdateEmail, setFormUpdateEmail] = useState<CadastroEmailProps>()
    const [formUpdateTelefone, setFormUpdateTelefone] = useState<CadastroTelefoneProps>()
    const [formUpdateGeral, setFormUpdateGeral] = useState<CadastraFuncionarioGeralProps>({ funcionario: { fkStatus: 1, sexo: "M", fkNvlAcesso: 2, senha: "123456", fkAcesso: 1, } })
    const [salario, setSalario] = useState<number>()
    const DataCargos = useBuscarCargos(formUpdate?.fkDepartamento || 0)
    const DataCargo = useBuscarCargo(formUpdate?.fkCargo || 0)
    const client = useQueryClient()
    const validateToken = useValidateToken()
    const router = useRouter()
    const patchMutationFuncionario = useMutation({
        mutationFn: patchFuncionario,
        onError: () => message({ toast, detail: 'Erro na execução', severity: 'error', summary: 'Operação' }),
        onMutate: () => message({ toast, detail: 'Aguarde', severity: 'warn', summary: 'Operação' }),
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ['findForMatricula'] })
            message({ toast, detail: 'Operação realizada com sucesso', severity: 'success', summary: 'Operação' })
        }
    })
    const handleChangeInputGeral = () => {
        setFormUpdateGeral({
            funcionario: formUpdate,
            funcionarioEmail: formUpdateEmail,
            funcionarioEndereco: formUpdateEndereco,
            funcionarioTelefone: formUpdateTelefone
        })
    }
    useEffect(() => {
        setSalario(DataCargo.data?.salario)
    }, [DataCargo])

    useEffect(() => {
        //@ts-ignore
        setFormUpdate({ ...formUpdate, ...data })
        setFormUpdateEmail(DataEmail?.data)
        setFormUpdateEndereco(DataEndereco?.data)
        setFormUpdateTelefone(DataTelefone?.data)

    }, [Fetching, DataEmail.data, DataEndereco.data, DataTelefone.data])

    useEffect(() => {
        handleChangeInputGeral()
    }, [formUpdateEndereco, formUpdateEmail, formUpdateTelefone, formUpdate])

    useEffect(() => {
        HandleChangeSetState("imagemFuncionario", base64URL, setFormUpdate, formUpdate)
    }, [base64URL])

    useEffect(() => {
        if (validateToken.data) {
            if (validateToken.data == 403) router.push("/")
            if (validateToken.data == 401) router.push("/")
        }
    }, [validateToken.data])
    useEffect(() => {
        client.invalidateQueries({ queryKey: ['ValidateToken'] })
    }, [])

    return (
        <section className={`${saira.className} flex flex-col w-full gap-6`}>
            <div className="w-fit py-4">
                <BtnBack />
            </div>
            <h1 className="font-extrabold text-4xl">Consulta Funcionario</h1>
            { Fetching ? <div className="w-full justify-center items-center h-[60vh]">
                <LoadingComponent />
            </div> :  <div className="flex flex-col gap-12 p-10 w-full">
                <div className="flex flex-col gap-4 ">
                    <h2 className="text-2xl font-semibold">Informações Pessoais</h2>
                    <div className="flex gap-2 flex-col">
                        <div className="flex gap-2">
                            <div className="grid grid-cols-2 grid-rows-2 w-1/2 gap-2">
                                <Input
                                    defaultValue={formUpdate?.nome}
                                    disabled={unlockOfInput}
                                    eventInput={(e) => HandleChangeSetState("nome", e, setFormUpdate, formUpdate)}
                                    type="text"
                                    text="Nome"
                                    placeholder="Mario Alberto"
                                    required={true}
                                />
                                <Input
                                    defaultValue={formUpdate?.tituloEleitor}
                                    disabled={unlockOfInput}
                                    eventInput={(e) => HandleChangeSetState("tituloEleitor", e, setFormUpdate, formUpdate)}
                                    type="text"
                                    text="Titulo de Eleitor"
                                />
                                <Input
                                    defaultValue={formUpdate?.reservista}
                                    disabled={unlockOfInput}
                                    eventInput={(e) => HandleChangeSetState("reservista", e, setFormUpdate, formUpdate)}
                                    type="Reservista"
                                    text="Reservista"
                                />
                            </div>
                            <div className="grid grid-cols-3 w-1/2 gap-x-2">
                                <Input
                                    defaultValue={formUpdate?.dataNascimento}
                                    disabled={unlockOfInput}
                                    eventInput={(e) => HandleChangeSetState("dataNascimento", e, setFormUpdate, formUpdate)}
                                    type="date"
                                    text="Data de Nascimento"
                                    required={true}
                                />
                                <SelectInput
                                    onChange={(e) => HandleChangeSetState("sexo", e.currentTarget.value, setFormUpdate, formUpdate)}
                                    required={true}
                                    value={formUpdate?.sexo}
                                    options={GenersOptions}
                                    text='Genero'
                                    defaultValue={0}
                                    disabled={unlockOfInput}
                                />
                                <SelectInput
                                    onChange={(e) => HandleChangeSetState("estadoCivil", e.currentTarget.value, setFormUpdate, formUpdate)}
                                    required={true}
                                    value={formUpdate?.estadoCivil}
                                    options={EstadoCivilOptions}
                                    text='Estado Civil'
                                    defaultValue={0}
                                    disabled={unlockOfInput}
                                />
                                <Input
                                    defaultValue={formUpdate?.cpf}
                                    disabled={unlockOfInput}
                                    eventInput={(e) => HandleChangeSetState("cpf", e, setFormUpdate, formUpdate)}
                                    type="text"
                                    text="CPF"
                                    placeholder="123.456.789.12"
                                    required={true}
                                />
                                <Input
                                    defaultValue={formUpdate?.rg}
                                    disabled={unlockOfInput}
                                    eventInput={(e) => HandleChangeSetState("rg", e, setFormUpdate, formUpdate)}
                                    type="text"
                                    text="RG"
                                    placeholder="12.123.123.3"
                                    required={true}
                                />
                                <Input
                                    defaultValue={formUpdateTelefone?.telefone}
                                    disabled={unlockOfInput}
                                    eventInput={(e) => HandleChangeSetState("telefone", e, setFormUpdateTelefone, formUpdateTelefone)}
                                    type="tel"
                                    text="Telefone"
                                    placeholder="(00) 0 0000000"
                                    required={true}
                                />
                            </div>
                        </div>
                        <div className="flex w-full gap-x-2">
                            <Input
                                defaultValue={formUpdateEmail?.email}
                                disabled={unlockOfInput}
                                eventInput={sendResquest}
                                type="email"
                                text="Email"
                                placeholder="exemplo@gmail.com"
                                required={true}
                            />
                            <Input
                                defaultValue={formUpdateEmail?.email}
                                disabled={unlockOfInput}
                                eventInput={(e) => HandleChangeSetState("email", e, setFormUpdateEmail, formUpdateEmail)}
                                type="email"
                                text="Confirmar Email"
                                placeholder="exemplo@gmail.com"
                                required={true}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 ">
                    <h2 className="text-2xl font-semibold">Endereço</h2>
                    <div className="flex w-full gap-x-2">
                        <Input
                            defaultValue={formUpdateEndereco?.rua}
                            disabled={unlockOfInput}
                            eventInput={(e) => HandleChangeSetState("rua", e, setFormUpdateEndereco, formUpdateEndereco)}
                            type="text"
                            text="Rua"
                            placeholder="Rua 9 de Julho"
                        />
                        <Input
                            defaultValue={formUpdateEndereco?.complemento}
                            disabled={unlockOfInput}
                            eventInput={(e) => HandleChangeSetState("complemento", e, setFormUpdateEndereco, formUpdateEndereco)}
                            type="text"
                            text="Complemento"
                            placeholder="Apartamento 4°Andar"
                        />
                    </div>
                    <div className="flex w-full gap-x-2">
                        <Input
                            defaultValue={formUpdateEndereco?.cep}
                            disabled={unlockOfInput}
                            eventInput={(e) => HandleChangeSetState("cep", e, setFormUpdateEndereco, formUpdateEndereco)}
                            type="text"
                            text="CEP"
                            placeholder="12345-000"
                            required={true}
                        />
                        <Input
                            defaultValue={formUpdateEndereco?.numero}
                            disabled={unlockOfInput}
                            eventInput={(e) => HandleChangeSetState("numero", e, setFormUpdateEndereco, formUpdateEndereco)}
                            type="number"
                            text="Numero"
                            placeholder="100"
                        />
                        <Input
                            defaultValue={formUpdateEndereco?.bairro}
                            disabled={unlockOfInput}
                            eventInput={(e) => HandleChangeSetState("bairro", e, setFormUpdateEndereco, formUpdateEndereco)}
                            type="text"
                            text="Bairro"
                            placeholder="Jardim Santa Cruz"
                        />
                        <Input
                            defaultValue={formUpdateEndereco?.cidade}
                            disabled={unlockOfInput}
                            eventInput={(e) => HandleChangeSetState("cidade", e, setFormUpdateEndereco, formUpdateEndereco)}
                            type="text"
                            text="Cidade"
                            placeholder="São Paulo"
                        />
                        <Input
                            defaultValue={formUpdateEndereco?.uf}
                            disabled={unlockOfInput}
                            eventInput={(e) => HandleChangeSetState("uf", e, setFormUpdateEndereco, formUpdateEndereco)}
                            type="text"
                            text="UF"
                            placeholder="SP"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-semibold">Profissional</h2>
                    <div className="flex w-full gap-x-2">
                        <SelectInput
                            onChange={(e) => HandleChangeSetState("fkDepartamento", e.currentTarget.value, setFormUpdate, formUpdate)}
                            required={true}
                            value={formUpdate?.fkDepartamento}
                            options={SelectDepartamento(DataDepartamento.data)}
                            text='Departamento'
                            defaultValue={0}
                            disabled={unlockOfInput}
                        />
                        <SelectInput
                            onChange={(e) => HandleChangeSetState("fkCargo", e.currentTarget.value, setFormUpdate, formUpdate)}
                            required={true}
                            value={formUpdate?.fkCargo}
                            options={SelectCargo(DataCargos.data, formUpdate?.fkDepartamento || 0)}
                            text='Cargo'
                            defaultValue={0}
                            disabled={unlockOfInput}
                        />
                        <Input
                            disabled={unlockOfInput}
                            defaultValue={salario}
                            eventInput={sendResquest}
                            type="text"
                            text="Salario Base"
                            placeholder="R$ 4600"
                            required={true}
                        />
                    </div>
                    <div className="flex w-full gap-x-2">
                        <Input
                            defaultValue={formataCaracteres('carteiradetrabalho', formUpdate?.carteiraTrabalho)}
                            disabled={unlockOfInput}
                            eventInput={(e) => HandleChangeSetState("carteiraTrabalho", e, setFormUpdate, formUpdate)}
                            type="text"
                            text="Carteira de Trabalho"
                            placeholder="0000000 | 000-0"
                            required={true}
                        />
                        <Input
                            defaultValue={formataCaracteres('nit', formUpdate?.nit?.toString())}
                            disabled={unlockOfInput}
                            eventInput={(e) => HandleChangeSetState("nit", e, setFormUpdate, formUpdate)}
                            type="text"
                            text="NIT"
                            required={true}
                        />
                        <Input
                            defaultValue={formataCaracteres('nit', formUpdate?.pis?.toString())}
                            disabled={unlockOfInput}
                            eventInput={(e) => HandleChangeSetState("pis", e, setFormUpdate, formUpdate)}
                            type="text"
                            text="PIS/PASEP"
                            placeholder="000.00000.00-0"
                            required={true}
                        />
                        <Input
                            defaultValue={formUpdate?.dataAdmissao} disabled={unlockOfInput}
                            eventInput={(e) => HandleChangeSetState("dataAdmissao", e, setFormUpdate, formUpdate)}
                            type="date"
                            text="Data Admissão"
                            placeholder="SP"
                            required={true}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    {
                        formUpdate?.fkStatus === 1 ? <BtnInactive toastEvent={() => { }} eventClick={() => { setFormUpdate({ ...formUpdate, fkStatus: 2 }) }} /> : <BtnActive toastEvent={() => { }} eventClick={() => { setFormUpdate({ ...formUpdate, fkStatus: 1 }) }} />
                    }

                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-semibold">Upload Foto de Perfil</h2>
                    <div className="flex flex-col items-center self-start gap-10">
                        <div className="border-2 border-green-400 rounded-full overflow-hidden">
                            <img className="w-52 h-52" src={formUpdate?.imagemFuncionario ?? base64URL} alt="" />
                        </div>
                        <div className="flex min-w[200px] w-[300px] max-w[390px] gap-x-2">
                            <Input
                                disabled={unlockOfInput}
                                eventInput={sendResquest}
                                type="file"
                                name="file"
                                onChange={(e) => handleFileInputChange({ e, base64URL, file, setBase64URL, setFile })}
                                required={true}
                            />
                        </div>
                    </div>
                </div>
            </div>}

            <div className="fixed bottom-0 left-0 w-full h-fit">
                <div className="flex justify-center items-center gap-2 p-10 bg-white border-t-4 border-green-600">

                    <BtnSave
                        toastEvent={() => { }}
                        eventClick={() => patchMutationFuncionario.mutate((formUpdateGeral))}
                    />

                    <BtnEdit
                        eventClick={handleUnlockOfInput}
                        toastEvent={() => message({ toast, detail: 'Operação realizada com sucesso', severity: 'success', summary: 'Operação' })}
                    />
                </div>
            </div>
            <Toast
                className="translate-y-48"
                ref={toast}
            />
        </section>
    )
}