// Components
import CardPost from "@/components/CardPost/CardPost";
import { TextInput } from "@/components/InputText/InputText";
import { Post } from "@/interfaces";
import { NextPage } from "next";
import Head from "next/head";
import { Filter } from "@/components/Filter/Filter";

// Utilities
import { useServiceMutation, useServiceQuery } from "@/Utilities/Services";
import { emailRegex } from "@/Utilities/Variables";
import { useToast } from "@chakra-ui/react";

// Hooks
import { useState } from "react";

// Interfaces
interface PortugalPageProps {
  blogDataDefault: Post[];
  blogDataCreateAsc: Post[];
  blogDataUpdateAsc: Post[];
  blogDataUpdateDes: Post[];
}

const PortugalPage: NextPage<PortugalPageProps> = ({
  blogDataDefault,
  blogDataCreateAsc,
  blogDataUpdateAsc,
  blogDataUpdateDes,
}) => {
  const [subscribeValue, setSubscribeValue] = useState("");
  const [selected, setSelected] = useState({ value: "" });
  const { subscribeEmail, loading } = useServiceMutation();
  const toast = useToast();

  async function handleSubscribeSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (subscribeValue !== "" && emailRegex.test(subscribeValue)) {
      await subscribeEmail(subscribeValue);
      setSubscribeValue("");
    } else {
      toast({
        title: "Erro",
        position: "top",
        description: "Preencha o campo de e-mail.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  function handleSelected(newValue: string) {
    setSelected({ value: newValue });
  }
  function handleSubscribeChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSubscribeValue(event.target.value);
  }

  let blogdata = [];

  switch (selected.value) {
    case "criacaoDecrescente":
      blogdata = blogDataDefault;
      break;
    case "criacaoCrescente":
      blogdata = blogDataCreateAsc;
      break;
    case "atualizacaoDecrescente":
      blogdata = blogDataUpdateDes;
      break;
    case "atualizacaoCrescente":
      blogdata = blogDataUpdateAsc;
      break;
    default:
      blogdata = blogDataDefault;
      break;
  }

  return (
    <>
      <Head>
        <title>Portugal</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full min-h-screen py-0">
        <section className=" text-center lg:text-start items-center bg-green-400 pt-7 lg:pt-0 lg:mt-28">
          <div className="container">
            <div className=" flex flex-col items-center gap-5">
              <h1 className="mt-20 text-3xl font-medium  lg:text-5xl text-green-500 flex gap-4">
                Portugal
              </h1>
              <div className="mb-5">
                <Filter onClick={handleSelected} />
              </div>
            </div>
          </div>
        </section>
        <section className="flex justify-center bg-blogPages">
          <div className="container flex flex-wrap gap-x-2  content-center gap-y-6 lg:gap-y-16 justify-self-center lg:justify-between">
            {blogdata.map((item, index) => (
              <div key={index}>
                <CardPost blogData={item} type="primary" />
              </div>
            ))}
          </div>
        </section>
        <section className="container ">
          <div className="container my-10 text-center text-gray-500 bg-white-400 lg:bg-subscribeLg bg-cover py-14 lg:my-20">
            <span className="mt-7 text-green-500 font-medium">Newsletter</span>
            <h2 className="mt-2 text-2xl sm:text-4xl text-black-400 font-medium">
              Fique por dentro das nossas atualizações!
            </h2>
            <p className="text-sm sm:text-base mt-4 text-gray-300">
              Saiba o que acontece no mundo da imigrações e cidadania em
              Portugal e Itália.
            </p>

            <form
              onSubmit={handleSubscribeSubmit}
              className="flex flex-col items-center lg:items-baseline gap-5  mt-8 justify-center max-w-md mx-auto lg:flex-row"
            >
              <div className="w-64">
                <TextInput.Root>
                  <TextInput.Input
                    type="email"
                    value={subscribeValue}
                    placeholder="Digite o seu melhor E-mail"
                    onChange={handleSubscribeChange}
                  />
                </TextInput.Root>
              </div>

              <button
                type="submit"
                className="linkButton text-sm lg:text-base mt-4"
                disabled={loading}
              >
                Cadastrar
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default PortugalPage;

export async function getStaticProps() {
  const {
    getAllPostsByType,
    getAllPostsByTypeOrderCreatedAsc,
    getAllPostsByTypeOrderUpdatedAsc,
    getAllPostsByTypeOrderUpdatedDes,
  } = await useServiceQuery();

  const blogDataDefault = await getAllPostsByType("portugal");
  const blogDataCreateAsc = await getAllPostsByTypeOrderCreatedAsc("portugal");
  const blogDataUpdateAsc = await getAllPostsByTypeOrderUpdatedAsc("portugal");
  const blogDataUpdateDes = await getAllPostsByTypeOrderUpdatedDes("portugal");

  if (!blogDataDefault) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      blogDataDefault,
      blogDataCreateAsc,
      blogDataUpdateAsc,
      blogDataUpdateDes,
    },
    revalidate: 60 * 60 * 1, // 1 hour
  };
}
