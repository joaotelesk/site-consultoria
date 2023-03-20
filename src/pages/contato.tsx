// Components
import { Carousel } from "@/components/Carousel/Carousel";
import { TextInput } from "@/components/InputText/InputText";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useToast } from "@chakra-ui/react";
import { CardBlogCarousel } from "@/components/CardBlogCarousel/CardBlog";

import { AiOutlineFacebook, AiOutlineInstagram } from "react-icons/ai";
import {
  BsTelephoneFill,
  BsFillEnvelopeFill,
  BsWhatsapp,
} from "react-icons/bs";

// Hooks
import { ChangeEvent, useState } from "react";

// Utilities
import { emailRegex, initState } from "@/Utilities/Variables";
import { useServiceMutation } from "@/Utilities/Services";

// Interfaces
import { FormValue, Post } from "@/interfaces";

export default function Contato() {
  const [values, setValues] = useState<FormValue>(initState);

  const toast = useToast();
  const { subscribeEmail, formContact, loading } = useServiceMutation();
  async function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (
      values.name !== "" &&
      values.email !== "" &&
      emailRegex.test(values.email)
    ) {
      await formContact(
        values.name,
        values.email,
        values.cellPhone,
        values.message
      );
      setValues(initState);
    } else {
      toast({
        title: "Erro",
        position: "top",
        description: "Preencha os campos requeridos corretamente",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  function handleFormChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }
  return (
    <>
      <Head>
        <title>Contato</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full min-h-screen py-0">
        <section className=" text-center lg:text-start items-center pt-16 lg:pt-0 lg:mt-28 bg-green-400 lg:box-contato">
          <div className="container bg-green-400 grid grid-cols-1 lg:grid-cols-6 lg:gap-x-11">
            <div className="py-7 lg:py-20 flex flex-col col-span-4">
              <div className=" flex flex-col lg:flex-row items-center lg:items-end gap-1">
                <h1 className="mt-4 text-3xl font-medium  lg:text-5xl text-green-500 flex gap-4 order-2 lg:order-1">
                  Converse com a Imigrei!
                </h1>
              </div>
              <p className="mx-auto mt-4 lg:mt-6 text-green-300 text-sm lg:text-xl max-w-md lg:ml-0  lg:leading-6">
                Entre em contato conosco através de um dos meios de contato
                abaixo e te retornaremos em até 72 horas!
              </p>
            </div>
            <Image
              src="/Contato/banner.svg"
              alt="Imagem banner principal"
              width={280}
              height={285}
              className="self-end mx-auto mt-5 col-span-2"
            />
          </div>
        </section>
        <section className=" pb-0 lg:bg-white-400">
          <div className="my-0  container   flex justify-center items-center ">
            <div className="py-20 grid  grid-cols-1 lg:grid-cols-6 gap-x-24">
              <div className="lg:max-w-md py-10 text-center  px-5 lg:px-0 lg:col-span-3">
                <h2 className="mt-2 text-xl lg:text-4xl text-green-500 font-medium">
                  Formulário
                </h2>

                <form
                  onSubmit={handleFormSubmit}
                  className="mt-9 flex flex-col gap-5 lg:gap-7"
                >
                  <input
                    className="input"
                    type="text"
                    placeholder="Nome *"
                    value={values.name}
                    name="name"
                    onChange={handleFormChange}
                    required
                  />

                  <div className="flex items-center gap-5 flex-wrap">
                    <input
                      className="input flex-grow"
                      type="email"
                      placeholder="Email *"
                      name="email"
                      value={values.email}
                      onChange={handleFormChange}
                      required
                    />
                    <input
                      className="input flex-grow"
                      type="tel"
                      placeholder="Telefone"
                      name="cellPhone"
                      value={values.cellPhone}
                      onChange={handleFormChange}
                    />
                  </div>
                  <textarea
                    className="input h-24"
                    placeholder="Mensagem"
                    name="message"
                    value={values.message}
                    onChange={handleFormChange}
                  />
                  <button
                    type="submit"
                    className="linkButton mt-10"
                    disabled={loading}
                  >
                    Enviar
                  </button>
                </form>
              </div>
              <div className="lg:col-span-1  my-10">
                <div className="flex lg:flex-col justify-around h-full items-center  gap-x-8  lg:gap-y-8 px-8 lg:py-12">
                  <div className="w-full h-[.7px] lg:w-[.7px] lg:h-full bg-green-200" />
                  <span className="font-bold text-2xl text-green-200">OU</span>
                  <div className="w-full h-[.7px] lg:w-[.7px] lg:h-full bg-green-200" />
                </div>
              </div>
              <div className="text-center flex flex-col items-center justify-center lg:col-span-2 ">
                <h2 className="mt-2 text-xl lg:text-2xl sm:text-4xl text-green-500 font-medium">
                  Contato Direto
                </h2>
                <ul className=" mt-9 lg:mt-16 flex flex-col gap-6 text-green-500 text-base lg:text-2xl font-normal">
                  <li>
                    <Link
                      className="flex items-center gap-x-6"
                      href="#"
                      aria-label="Link para"
                    >
                      <BsTelephoneFill
                        size={20}
                        aria-label="telefone"
                        className="text-green-500"
                      />
                      <span>55+ 11 0 0000 - 0000</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-6"
                      href="#"
                      aria-label="Link para"
                    >
                      <BsFillEnvelopeFill
                        size={20}
                        aria-label="e-mail"
                        className="text-green-500"
                      />
                      <span>contato@imigrei.net</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-6"
                      href="#"
                      aria-label="Link para"
                    >
                      <BsWhatsapp
                        size={20}
                        aria-label="whatsapp"
                        className="text-green-500"
                      />
                      <span>55+ 11 9 9999 - 9999</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
