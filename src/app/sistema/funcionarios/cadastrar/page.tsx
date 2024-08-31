'use client'
import { handleFileInputChange } from "@/utils/ConverterImageBase64/ConverterImageBase64";
import { BtnBack } from "@/Components/Buttons/BtnBack/BtnBack";
import { BtnSave } from "@/Components/Buttons/BtnSave/BtnSave";
import { Input } from "@/Components/Input/Input";
import { saira } from "@/utils/ChangeFont";
import { useEffect, useRef, useState } from "react";
import { SelectInput } from "@/Components/SelectInput/SelectInput";
import { CadastraFuncionarioGeralProps, CadastraFuncionarioProps } from "@/TypesObjects/FormCadastraFuncionarios/FormCadastraFuncionarios";
import { SelectDepartamento } from "@/utils/SelectDepartamento/SelectDepartamento";
import { SelectCargo } from "@/utils/SelectCargo/SelectCargo";
import { useBuscarCargo } from "@/hooks/useBuscarCargo";
import { CadastroEnderecoProps } from "@/TypesObjects/FormEndereco/FormEndereco";
import { CadastroEmailProps, CadastroTelefoneProps } from "@/TypesObjects/FormTelefoneEmail/FormTelefoneEmail";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postFuncionario } from "@/api/post/postFuncionario/postFuncionario";
import { GenersOptions } from "@/TypesObjects/GeneroType/GeneroType";
import { EstadoCivilOptions } from "@/TypesObjects/EstadoCivilType/EstadoCivilType";
import { useBuscarTodosDepartamento } from "@/hooks/useBuscarTodosDepartamento";
import { useBuscarCargos } from "@/hooks/useBuscarTodosCargos";
import { message } from "@/utils/mensagesToast/message";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";
import { useValidateToken } from "@/hooks/useValidateToken";



export default function Page() {

    function sendResquest(value: string): void {
        console.log(value)
    }
    const DataDepartamento = useBuscarTodosDepartamento()


    const [formCadastro, setFormCadastro] = useState<CadastraFuncionarioProps>({ fkStatus: 1, sexo: "", fkNvlAcesso: 1, senha: "123456", fkAcesso: 1, })
    const [formCadastroEndereco, setFormCadastroEndereco] = useState<CadastroEnderecoProps>()
    const [formCadastroEmail, setFormCadastroEmail] = useState<CadastroEmailProps>()
    const [formCadastroTelefone, setFormCadastroTelefone] = useState<CadastroTelefoneProps>()
    const [formCadastroGeral, setFormCadastroGeral] = useState<CadastraFuncionarioGeralProps>({ funcionario: { fkStatus: 1, sexo: "M", fkNvlAcesso: 1, fkEmpresa: 1, senha: "123456", fkAcesso: 1, } })
    const toast = useRef(null)
    const DataCargo = useBuscarCargos(formCadastro["fkDepartamento"] || 0)
    const { data } = useBuscarCargo(formCadastro["fkCargo"])
    const handleChangeInput = (type: string, value: any) => {
        if (value) setFormCadastro({ ...formCadastro, [`${type}`]: value })
        if (value == 0) value = ''
        setFormCadastro({ ...formCadastro, [`${type}`]: value })
    }
    const handleChangeInputEndereco = (type: string, value: string | number) => {
        if (value) setFormCadastroEndereco({ ...formCadastroEndereco, [`${type}`]: value })
        if (value == 0) value = ''
        setFormCadastroEndereco({ ...formCadastroEndereco, [`${type}`]: value })
    }
    const handleChangeInputTelefone = (type: string, value: string | number) => {
        if (value) setFormCadastroTelefone({ ...formCadastroTelefone, [`${type}`]: value })
        if (value == 0) value = ''
        setFormCadastroTelefone({ ...formCadastroTelefone, [`${type}`]: value })
    }
    const handleChangeInputEmail = (type: string, value: string | number) => {
        if (value) setFormCadastroEmail({ ...formCadastroEmail, [`${type}`]: value })
        if (value == 0) value = ''
        setFormCadastroEmail({ ...formCadastroEmail, [`${type}`]: value })
    }

    const handleChangeInputGeral = () => {
        setFormCadastroGeral({
            funcionario: formCadastro,
            funcionarioEmail: formCadastroEmail,
            funcionarioEndereco: formCadastroEndereco,
            funcionarioTelefone: formCadastroTelefone
        })
    }

    const [salario, setSalario] = useState<number>()
    const [file, setFile] = useState<File | null>(null);
    const [base64URL, setBase64URL] = useState<string>('');

    useEffect(() => {
        setSalario(data?.salario || 0)
    }, [salario, data])

    useEffect(() => {
        handleChangeInputGeral()
    }, [formCadastroEndereco, formCadastroEmail, formCadastroTelefone, formCadastro])

    useEffect(() => {
        handleChangeInput("imagemFuncionario", base64URL)
    }, [base64URL])

    const postMutationFuncionario = useMutation({
        mutationFn: postFuncionario,
        onError: () => message({ toast, detail: 'Erro na execução', severity: 'error', summary: 'Operação' }),
        onMutate: () => message({ toast, detail: 'Aguarde', severity: 'warn', summary: 'Operação' }),
        onSuccess: () => message({ toast, detail: 'Operação realizada com sucesso', severity: 'success', summary: 'Operação' })
    })

    const validateToken = useValidateToken()
    const router = useRouter()
    const client = useQueryClient()
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
            <h1 className="font-extrabold text-4xl">Cadastrar Funcionario</h1>
            <form className="flex flex-col gap-12 p-10 w-full">
                <div className="flex flex-col gap-4 ">
                    <h2 className="text-2xl font-semibold">Informações Pessoais</h2>
                    <div className="flex gap-2 flex-col">
                        <div className="flex gap-2">
                            <div className="grid grid-cols-2 grid-rows-2 w-1/2 gap-2">
                                <Input
                                    eventInput={(e) => handleChangeInput("nome", e)}
                                    type="text" text="Nome"
                                    placeholder="Mario Alberto"
                                    required={true}
                                />
                                <Input
                                    eventInput={(e) => handleChangeInput("tituloEleitor", e)}
                                    type="text"
                                    text="Titulo de Eleitor"
                                />
                                <Input
                                    eventInput={(e) => handleChangeInput("reservista", e)}
                                    type="Reservista"
                                    text="Reservista"
                                />
                            </div>
                            <div className="grid grid-cols-3 w-1/2 gap-x-2">
                                <Input
                                    // mask="date"
                                    minLength={8}
                                    eventInput={(e) => handleChangeInput("dataNascimento", e)}
                                    text="Data de Nascimento"
                                    required={true}
                                    type="date"
                                />
                                <SelectInput
                                    onChange={(e) => handleChangeInput("sexo", e.currentTarget.value)}
                                    required={true}
                                    value={formCadastro["sexo"]}
                                    options={GenersOptions}
                                    text='Genero'
                                    defaultValue={0}
                                />
                                <SelectInput
                                    onChange={(e) => handleChangeInput("estadoCivil", e.currentTarget.value)}
                                    required={true}
                                    value={formCadastro["estadoCivil"]}
                                    options={EstadoCivilOptions}
                                    text='Estado Civil'
                                    defaultValue={0}
                                />
                                <Input
                                    mask="cpf"
                                    eventInput={(e) => handleChangeInput("cpf", e)}
                                    type="text"
                                    text="CPF"
                                    placeholder="123.456.789.12"
                                    required={true}
                                />
                                <Input
                                    mask="rg"
                                    eventInput={(e) => handleChangeInput("rg", e)}
                                    type="text"
                                    text="RG"
                                    placeholder="12.123.123.3"
                                    required={true}
                                />
                                <Input
                                    mask="phone"
                                    eventInput={(e) => handleChangeInputTelefone("telefone", e)}
                                    type="tel"
                                    text="Telefone"
                                    placeholder="(00) 0 0000000"
                                    required={true}
                                />
                            </div>
                        </div>
                        <div className="flex w-full gap-x-2">
                            <Input
                                eventInput={sendResquest}
                                type="email"
                                text="Email"
                                placeholder="exemplo@gmail.com"
                                required={true}
                            />
                            <Input
                                eventInput={(e) => handleChangeInputEmail("email", e)}
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
                            eventInput={(e) => handleChangeInputEndereco("rua", e)}
                            type="text"
                            text="Rua"
                            placeholder="Rua 9 de Julho"
                        />
                        <Input
                            eventInput={(e) => handleChangeInputEndereco("complemento", e)}
                            type="text"
                            text="Complemento"
                            placeholder="Apartamento 4°Andar"
                        />
                    </div>
                    <div className="flex w-full gap-x-2">
                        <Input
                            mask="cep"
                            eventInput={(e) => handleChangeInputEndereco("cep", e)} type="text"
                            text="CEP"
                            placeholder="12345-000"
                            required={true}
                        />
                        <Input
                            eventInput={(e) => handleChangeInputEndereco("numero", e)} type="number"
                            text="Numero"
                            placeholder="100"
                        />
                        <Input
                            eventInput={(e) => handleChangeInputEndereco("bairro", e)} type="text"
                            text="Bairro"
                            placeholder="Jardim Santa Cruz"
                        />
                        <Input
                            eventInput={(e) => handleChangeInputEndereco("cidade", e)} type="text"
                            text="Cidade"
                            placeholder="São Paulo"
                        />
                        <Input
                            eventInput={(e) => handleChangeInputEndereco("uf", e)} type="text"
                            text="UF"
                            placeholder="SP"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-semibold">Profissional</h2>
                    <div className="flex w-full gap-x-2">
                        <SelectInput
                            onChange={(e) => handleChangeInput("fkDepartamento", Number(e.currentTarget.value))}
                            required={true}
                            value={formCadastro["fkDepartamento"] ?? 0}
                            options={SelectDepartamento(DataDepartamento.data)}
                            text='Departamento'
                            defaultValue={0}
                        />
                        <SelectInput
                            onChange={(e) => handleChangeInput("fkCargo", Number(e.currentTarget.value))}
                            required={true}
                            value={formCadastro["fkCargo"]}
                            options={SelectCargo(DataCargo.data, formCadastro["fkDepartamento"] ?? 0,)}
                            text='Cargo'
                            defaultValue={-1}
                        />
                        <Input
                            eventInput={sendResquest}
                            readOnly={true}
                            value={salario ?? 0}
                            type="text"
                            text="Salario Base"
                            placeholder="R$ 4600"
                        />
                    </div>
                    <div className="flex w-full gap-x-2">
                        <Input
                            mask="ctps"
                            eventInput={(e) => handleChangeInput("carteiraTrabalho", e)}
                            type="text"
                            text="Carteira de Trabalho"
                            placeholder="0000000 | 000-0"
                            required={true}
                        />
                        <Input
                            eventInput={(e) => handleChangeInput("nit", e)}
                            type="text"
                            text="NIT" required={true}
                        />
                        <Input
                            mask="pis"
                            eventInput={(e) => handleChangeInput("pis", e)}
                            type="text"
                            text="PIS/PASEP"
                            placeholder="000.00000.00-0"
                            required={true}
                        />
                    </div>
                    <div className="flex w-1/3">
                        <Input
                            eventInput={(e) => handleChangeInput("dataAdmissao", e)}
                            type="date"
                            text="Data Admissão"
                            placeholder="11/10/1999"
                            required={true}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-semibold">Upload Foto de Perfil</h2>
                    <div className="flex flex-col items-center self-start gap-10">
                        <div className="border-2 border-green-400 rounded-full overflow-hidden">
                            <img className="w-52 h-52" src={base64URL} alt="" />
                        </div>
                        <div className="flex min-w[200px] w-[300px] max-w[390px] gap-x-2">
                            <Input
                                eventInput={sendResquest}
                                type="file"
                                name="file"
                                onChange={(e) => { handleFileInputChange({ e, base64URL, file, setBase64URL, setFile }) }}
                                required={true}
                            />
                        </div>
                    </div>
                </div>
            </form>
            <div className="flex justify-center items-center gap-2">
                <Toast
                    className="translate-y-48"
                    ref={toast}
                />
                <BtnSave
                    toastEvent={() => { }}
                    eventClick={() => postMutationFuncionario.mutate(formCadastroGeral)}
                />
            </div>
        </section>
    )
}