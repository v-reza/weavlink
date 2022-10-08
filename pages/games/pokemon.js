/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import useNotif from "@/hooks/useNotif";
import useSocket from "@/hooks/useSocket";
import useUser from "@/hooks/useUser";
import Button from "@/uiComponents/Button";
import Card from "@/uiComponents/Card";
import Container from "@/uiComponents/Container";
import Sidebar from "@/uiComponents/Sidebar";
import classNames from "@/utils/classNames";
import { gridCols } from "@/utils/types";
import { Progress } from "flowbite-react";
import React, { useEffect, useState } from "react";

const listPokemon = [
  {
    id: 1,
    name: "Bulbasaur",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
    backDefaultGif:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/1.gif",
    frontDefaultGif:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif",
    health: 100,
    attack: 20,
    defense: 10,
  },
  {
    id: 2,
    name: "Ivysaur",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/2.png",
    backDefaultGif:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/2.gif",
    frontDefaultGif:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/2.gif",
    health: 100,
    attack: 20,
    defense: 10,
  },
  {
    id: 3,
    name: "Venusaur",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/3.png",
    backDefaultGif:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/3.gif",
    frontDefaultGif:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/3.gif",
    health: 100,
    attack: 20,
    defense: 10,
  },
  {
    id: 4,
    name: "Charmander",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/4.png",
    backDefaultGif:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/4.gif",
    frontDefaultGif:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/4.gif",
    health: 100,
    attack: 20,
    defense: 10,
  },
];

const Pokemon = () => {
  const [isJoinRoom, setIsJoinRoom] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [selectPokemon, setSelectPokemon] = useState([]);

  /* Rooms Play */
  const [play, setPlay] = useState(false);
  const [roomsPlay, setRoomsPlay] = useState([]);

  /* Pokemons Battle Play */
  const [myPokemon, setMyPokemon] = useState([]);
  const [enemyUser, setEnemyUser] = useState(null);
  const [enemyPokemon, setEnemyPokemon] = useState([]);

  /* Attack */
  const [attack, setAttack] = useState(false);
  const [attackEnemy, setAttackEnemy] = useState([]);
  const [attackMy, setAttackMy] = useState([]);
  const [animation, setAnimation] = useState(true);

  const [damageMyPokemon, setDamageMyPokemon] = useState(0);

  const { handleError } = useNotif();
  const { socket } = useSocket();
  const { user } = useUser();
  useEffect(() => {
    socket?.on("getRoom", (data) => {
      // console.log("room => ", data);
      setRooms(data);
    });

    socket?.on("getRoomsPlay", (data) => {
      // console.log("room play => ", data);
      setRoomsPlay(data);

      const myPokemon = data.find((item) => item.userId === user?._id);
      setMyPokemon(myPokemon?.listPokemons);

      const enemyPokemon = data.find((item) => item.userId !== user?._id);
      setEnemyPokemon(enemyPokemon?.listPokemons);
      setEnemyUser(enemyPokemon?.userId);
    });

    socket?.on("getAttackPokemon", (data) => {
      console.log("attackPokemon => ", data.room);
      if (data.room.userId === user?._id) {
        const myPokemon = data.room.listPokemons;
        setMyPokemon(myPokemon);
      } else if (data.room.userId !== user?._id) {
        const enemyPokemon = data.room.listPokemons;
        setEnemyPokemon(enemyPokemon);
      }
      // const myPokemon = data.find((item) => item.room.userId === user?._id);
      // console.log("myPokemonsSocket => ", myPokemon);
      // setMyPokemon(myPokemon?.listPokemons);
    });

    if (!isJoinRoom) {
      socket?.emit("removeRoom", {
        userId: user?._id,
      });
    }

    if (!play) {
      socket?.emit("removeRoomsPlay", {
        userId: user?._id,
      });
    }
  }, [socket, isJoinRoom, user?._id, play]);

  useEffect(() => {
    if (attack) {
      const timeout = setTimeout(() => {
        setAnimation(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [attack]);

  return (
    <div>
      <Container>
        <Container.Sidebar>
          <Sidebar lg={4} xl={4}>
            <Card usePx0={true}>
              <div className="h-[36rem] overflow-y-auto overflow-x-hidden">
                <div className="px-3 py-2 border-b border-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-md font-medium px-2">
                      Room
                    </span>
                  </div>
                </div>
                <div className="p-2">
                  <Button
                    onClick={() => {
                      socket?.emit("joinRoom", {
                        roomId: "room1",
                        userId: user?._id,
                      });
                      setIsJoinRoom(true);
                    }}
                    bg="transparent"
                    borderColor="slate-500"
                    mb="0"
                    py="2"
                    hoverBg="slate-700"
                    justify="start"
                    rounded="full"
                  >
                    <span className="text-white text-sm font-medium">
                      Join a room
                    </span>
                  </Button>
                </div>
              </div>
            </Card>
          </Sidebar>
        </Container.Sidebar>
        <Container.Main
          lg={gridCols.lg[8]}
          xl={gridCols.xl[8]}
          md={gridCols.md[10]}
        >
          <Card>
            {!isJoinRoom ? (
              <span className="text-white font-medium flex items-center justify-center">
                Please Join room first
              </span>
            ) : rooms.length > 1 ? (
              <div className="h-[40rem] overflow-y-auto overflow-x-hidden">
                {!play ? (
                  <>
                    <span className="text-white font-medium flex items-center justify-center mb-6">
                      Choose your pokemon
                    </span>
                    <div className="flex items-center justify-center gap-8">
                      {listPokemon.map((pokemon) => (
                        <div
                          className={`px-8 py-5 sm:px-6 rounded-md shadow-md cursor-pointer ${
                            selectPokemon.includes(pokemon)
                              ? "border-2 border-indigo-600 bg-slate-600"
                              : "bg-white"
                          }
                      }`}
                          key={pokemon.id}
                          onClick={() => {
                            if (
                              selectPokemon?.find(
                                (item) => item.id === pokemon.id
                              )
                            ) {
                              setSelectPokemon(
                                selectPokemon.filter(
                                  (item) => item.id !== pokemon.id
                                )
                              );
                            } else {
                              if (selectPokemon.length === 3) {
                                return handleError(
                                  "You can only choose 3 pokemon"
                                );
                              }
                              setSelectPokemon([...selectPokemon, pokemon]);
                            }
                          }}
                        >
                          <div className="flex space-x-3">
                            <div className="flex-shrink-0">
                              <img
                                className="h-20 w-20"
                                src={pokemon.image}
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="mt-2 flex items-center justify-center">
                            {pokemon.name}
                          </div>
                          <div className="mt-4 space-y-3">
                            <div className="flex items-center justify-center">
                              <span className="text-indigo-500 text-sm">
                                Health: {pokemon.health}
                              </span>
                            </div>
                            <div className="flex items-center justify-center">
                              <span className="text-indigo-500 text-sm">
                                Attack: {pokemon.attack}
                              </span>
                            </div>
                            <div className="flex items-center justify-center">
                              <span className="text-indigo-500 text-sm">
                                Defense: {pokemon.defense}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="w-full flex items-center justify-center py-8 px-12">
                      <button
                        type="button"
                        onClick={() => {
                          setPlay(true);
                          socket?.emit("roomsPlay", {
                            roomId: "room1",
                            userId: user?._id,
                            listPokemons: selectPokemon,
                          });
                        }}
                        disabled={selectPokemon.length === 3 ? false : true}
                        className={classNames(
                          selectPokemon.length === 3
                            ? "bg-indigo-600 hover:bg-indigo-700"
                            : "bg-slate-500/50 cursor-not-allowed",
                          "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2  text-base font-medium text-white sm:col-start-2 sm:text-sm"
                        )}
                      >
                        Play
                      </button>
                    </div>
                  </>
                ) : roomsPlay.length > 1 ? (
                  <>
                    <div className="space-y-18">
                      <div>
                        <span className="text-white text-md font-medium px-2">
                          UserId: {enemyUser}
                        </span>
                        <div className="flex p-2 items-center justify-between">
                          {enemyPokemon?.map((pokemon) => (
                            <div key={pokemon.id}>
                              {pokemon.health !== 0 && (
                                <>
                                  <span className="text-white text-md font-medium">
                                    {pokemon.name}
                                  </span>
                                  <Progress
                                    progress={pokemon.health}
                                    color="red"
                                  />
                                </>
                              )}
                              <div
                                key={pokemon.id}
                                className="relative flex items-center justify-center"
                              >
                                {attack && (
                                  <img
                                    className={`h-13 w-13 absolute ${
                                      animation
                                        ? "animate-ping"
                                        : "animate-none"
                                    }`}
                                    src="/attk.webp"
                                  />
                                )}
                                {pokemon.health !== 0 && (
                                  <img
                                    className="h-20 w-20 cursor-pointer"
                                    src={pokemon.frontDefaultGif}
                                    onClick={() => {
                                      socket?.emit("attackPokemon", {
                                        roomId: "room1",
                                        userId: enemyUser,
                                        damage: damageMyPokemon,
                                        defense: pokemon.defense,
                                        pokemonId: pokemon.id,
                                      });
                                    }}
                                  />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-20">
                        <div className="flex p-2 items-center justify-between">
                          {myPokemon?.map((pokemon) => (
                            <div key={pokemon.id}>
                              {pokemon.health !== 0 && (
                                <>
                                  <span className="text-white text-md font-medium">
                                    {pokemon.name}
                                  </span>
                                  <Progress
                                    progress={pokemon.health}
                                    color="red"
                                  />
                                </>
                              )}
                              <div
                                key={pokemon.id}
                                className="relative flex items-center justify-center"
                              >
                                {attack && (
                                  <img
                                    className={`h-13 w-13 absolute ${
                                      animation
                                        ? "animate-ping"
                                        : "animate-none"
                                    }`}
                                    src="/attk.webp"
                                  />
                                )}
                                <img
                                  className="h-20 w-20"
                                  src={pokemon.backDefaultGif}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-8 mt-4">
                        {myPokemon.map((pokemon) => (
                          <div
                            className={`bg-white px-8 py-1 sm:px-6 rounded-md shadow-md cursor-pointer`}
                            key={pokemon.id}
                          >
                            <div className="flex space-x-3">
                              <div className="flex-shrink-0">
                                <img
                                  className="h-20 w-20"
                                  src={pokemon.image}
                                  alt=""
                                />
                              </div>
                            </div>
                            <div className="mt-2 flex items-center justify-center">
                              {pokemon.name}
                            </div>
                            <div className="mt-4 space-y-3">
                              <div className="flex items-center justify-center">
                                <span className="text-indigo-500 text-sm">
                                  Health: {pokemon.health}
                                </span>
                              </div>
                              <div className="flex items-center justify-center">
                                <span className="text-indigo-500 text-sm">
                                  Attack: {pokemon.attack}
                                </span>
                              </div>
                              <div className="flex items-center justify-center">
                                <span className="text-indigo-500 text-sm">
                                  Defense: {pokemon.defense}
                                </span>
                              </div>
                            </div>
                            <Button
                              onClick={() => {
                                setAttack(true);
                                setAnimation(true);
                                setTimeout(() => {
                                  setAnimation(false);
                                  setAttack(false);
                                }, 1000);

                                setDamageMyPokemon(pokemon.attack);
                              }}
                              bg="slate-700"
                              borderColor="slate-500"
                              mb="0"
                              py="2"
                              hoverBg="slate-700/50"
                              justify="start"
                              rounded="full"
                            >
                              <span className="text-white text-sm font-medium">
                                Attack
                              </span>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <span className="text-white font-medium flex items-center justify-center">
                    Please wait for another player choose pokemon
                  </span>
                )}
              </div>
            ) : (
              <span className="text-white font-medium flex items-center justify-center">
                Please wait for another player
              </span>
            )}
          </Card>
        </Container.Main>
      </Container>
    </div>
  );
};

export default Pokemon;
