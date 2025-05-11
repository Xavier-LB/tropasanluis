<script lang="ts">
  import { onMount } from 'svelte';

  /**
   * Type definition for chord positioning data
   */
  type ChordInfo = {
    line: number;
    chord: string;
    position: number;
  };

  /**
   * Type definition for song data
   */
  type Song = {
    title: string;
    year: string;
    location: string;
    lyrics: string;
    chords: boolean;
    chordData?: ChordInfo[];
    youtubeLink?: string;
    spotifyLink?: string;
    spotifyEmbed?: string;
    composers?: string;
    youtubeEmbed?: string;
  };

  /**
   * Collection of songs from the Tropa San Luis songbook organized by year
   * @type {Array<Song>}
   */
  const songs: Song[] = [
    {
      title: "Anticura",
      year: "1998",
      location: "Anticura",
      lyrics: `Subir al tren 
Cargarlo bien 
La Patrulla ya se va
Por la ventana 
Veo un volcán 
Pronto la carpa habrá que armar

Cargar la carpa y el cajón 
Sacar el hacha, el cáñamo y el bidón
La tropa está en el lugar 
Es la San Luis que empieza a trabajar 

Esta noche
Mi guardia es
La cruz del sur me cuida bien 
Ya es de mañana 
Y sale el sol
Con mis amigos me voy de excursión

Cargar la carpa y el cajón 
Sacar el hacha, el cáñamo y el bidón
La tropa está en el lugar 
Es la San Luis que empieza a trabajar 

Esta noche
En la reunión
Junto al fuego la patrulla conversó 
Son mis amigos    
Los quiero bien
Es la patrulla que jamás olvidaré

Cargar la carpa y el cajón 
Sacar el hacha, el cáñamo y el bidón
La tropa está en el lugar 
Es la San Luis que empieza a trabajar.`,
      chords: true,
      chordData: [
        { line: 0, chord: "Re", position: 0 },
        { line: 1, chord: "La", position: 19 },
        { line: 2, chord: "Mi", position: 9 },
        { line: 2, chord: "La", position: 22 },
        { line: 3, chord: "Re", position: 16 },
        { line: 4, chord: "La", position: 17 },
        { line: 5, chord: "Mi", position: 18 },
        { line: 5, chord: "La", position: 42 },
        { line: 7, chord: "Do", position: 15 },
        { line: 7, chord: "Sol", position: 31 },
        { line: 8, chord: "Fa", position: 16 },
        { line: 8, chord: "Sol", position: 47 },
        { line: 9, chord: "Do", position: 17 },
        { line: 9, chord: "Sol", position: 30 },
        { line: 10, chord: "Fa", position: 19 },
        { line: 10, chord: "Sol", position: 40 },
        { line: 12, chord: "Re", position: 10 },
        { line: 13, chord: "La", position: 15 },
        { line: 14, chord: "Mi", position: 9 },
        { line: 14, chord: "La", position: 29 },
        { line: 15, chord: "Re", position: 15 },
        { line: 16, chord: "La", position: 17 },
        { line: 17, chord: "Mi", position: 18 },
        { line: 17, chord: "La", position: 40 },
        { line: 19, chord: "Do", position: 15 },
        { line: 19, chord: "Sol", position: 31 },
        { line: 20, chord: "Fa", position: 16 },
        { line: 20, chord: "Sol", position: 47 },
        { line: 21, chord: "Do", position: 17 },
        { line: 21, chord: "Sol", position: 30 },
        { line: 22, chord: "Fa", position: 19 },
        { line: 22, chord: "Sol", position: 40 },
        { line: 24, chord: "Re", position: 10 },
        { line: 25, chord: "La", position: 15 },
        { line: 26, chord: "Mi", position: 9 },
        { line: 26, chord: "La", position: 37 },
        { line: 27, chord: "Re", position: 15 },
        { line: 28, chord: "La", position: 17 },
        { line: 29, chord: "Mi", position: 18 },
        { line: 29, chord: "La", position: 42 },
        { line: 31, chord: "Do", position: 15 },
        { line: 31, chord: "Sol", position: 31 },
        { line: 32, chord: "Fa", position: 16 },
        { line: 32, chord: "Sol", position: 47 },
        { line: 33, chord: "Do", position: 17 },
        { line: 33, chord: "Sol", position: 30 },
        { line: 34, chord: "Fa", position: 19 },
        { line: 34, chord: "Sol", position: 40 }
      ]
    },
    {
      title: "Isla Huar",
      year: "2000",
      location: "Isla Huar",
      lyrics: `Suavemente se mecen las hamacas
de mis compañeros,
esta noche yo no duermo,
soy el vigía del galeón.

Llevamos años viviendo en el barco
izando las velas.
Siempre ir a otro lugar
donde mis penas ahogar.

Feroces e invencibles guerreros
ricos seremos.

Nunca el ron nos faltará
ni las cerveza en el puerto al atracar (bis)

Hay un mapa que tiene el capitán
de un gran tesoro,
es el tesoro que voy a buscar,
por eso me voy para Huar.

Feroces e invencibles guerreros…`,
      chords: true,
      youtubeLink: "https://www.youtube.com/watch?v=LS3V_u-KfsQ",
      chordData: [
        { line: 0, chord: "C", position: 0 },
        { line: 0, chord: "G", position: 41 },
        { line: 1, chord: "Am", position: 0 },
        { line: 1, chord: "E", position: 22 },
        { line: 2, chord: "F", position: 0 },
        { line: 2, chord: "G", position: 9 },
        { line: 2, chord: "C", position: 19 },
        { line: 2, chord: "F", position: 27 },
        { line: 3, chord: "C", position: 0 },
        { line: 3, chord: "G", position: 19 },
        { line: 3, chord: "C", position: 33 },
        { line: 5, chord: "C", position: 0 },
        { line: 5, chord: "G", position: 41 },
        { line: 6, chord: "Am", position: 0 },
        { line: 6, chord: "E", position: 22 },
        { line: 7, chord: "F", position: 0 },
        { line: 7, chord: "G", position: 9 },
        { line: 7, chord: "C", position: 19 },
        { line: 7, chord: "F", position: 27 },
        { line: 8, chord: "C", position: 0 },
        { line: 8, chord: "G", position: 19 },
        { line: 8, chord: "C", position: 33 },
        { line: 10, chord: "F", position: 0 },
        { line: 10, chord: "G", position: 9 },
        { line: 10, chord: "C", position: 29 },
        { line: 11, chord: "F", position: 0 },
        { line: 11, chord: "E", position: 2 },
        { line: 11, chord: "Am", position: 13 },
        { line: 13, chord: "F", position: 0 },
        { line: 13, chord: "E", position: 16 },
        { line: 13, chord: "Am", position: 27 },
        { line: 14, chord: "E", position: 15 },
        { line: 14, chord: "Am", position: 45 },
        { line: 16, chord: "C", position: 0 },
        { line: 16, chord: "G", position: 41 },
        { line: 17, chord: "Am", position: 0 },
        { line: 17, chord: "E", position: 22 },
        { line: 18, chord: "F", position: 0 },
        { line: 18, chord: "G", position: 9 },
        { line: 18, chord: "C", position: 19 },
        { line: 18, chord: "F", position: 27 },
        { line: 19, chord: "C", position: 0 },
        { line: 19, chord: "G", position: 19 },
        { line: 19, chord: "C", position: 33 }
      ]
    },
    {
      title: "Río Carihueico",
      year: "2001",
      location: "Río Carihueico",
      lyrics: `Si tu no conoces lo que es la amistad
Si añoras la mano que te ayudará
Si sientes angustia donde estás
Entonces, ven conmigo vamos a acampar.
 
Pasarás mucho frío, hambre y dolor
Estarás muy cochino, tendrás muy mal olor
Se te mojará la ropa y tus zapatos
Y diez mil coliguachos serán lo peor.

Parece imposible, pero cree en mis palabras
Si tienes valor y luchas con tesón
Cree bien en esto que te digo,
no lo dudarás, es lo mejor.
 
Pasarás mucho frío, hambre y dolor
Estarás muy cochino, tendrás muy mal olor
Se te mojará la ropa y tus zapatos
Y diez mil coliguachos serán lo peor.
 
De noche las estrellas te acompañarán
Tu alma en el río podrías lavar
Tu ropa mojada viento y sol secarán
y a los coliguachos vamos a aniquilar.

Pasarás mucho frío, hambre y dolor
Estarás muy cochino, tendrás muy mal olor
Se te mojará la ropa y tus zapatos
Y diez mil coliguachos serán lo peor.`,
      chords: true,
      chordData: [
        { line: 0, chord: "DoM", position: 0 },
        { line: 0, chord: "Faad9", position: 22 },
        { line: 0, chord: "DoM", position: 35 },
        { line: 0, chord: "Faad9", position: 45 },
        { line: 1, chord: "Sid", position: 0 },
        { line: 1, chord: "MiM", position: 25 },
        { line: 1, chord: "Lam", position: 37 },
        { line: 2, chord: "FaM", position: 0 },
        { line: 2, chord: "SolM", position: 16 },
        { line: 3, chord: "FaM", position: 0 },
        { line: 3, chord: "DoM", position: 20 },
        { line: 5, chord: "Lam", position: 0 },
        { line: 5, chord: "FaM", position: 27 },
        { line: 5, chord: "SolM", position: 32 },
        { line: 5, chord: "Lam", position: 45 },
        { line: 6, chord: "Lam", position: 0 },
        { line: 6, chord: "FaM", position: 27 },
        { line: 6, chord: "SolM", position: 35 },
        { line: 6, chord: "Lam", position: 47 },
        { line: 7, chord: "Lam", position: 0 },
        { line: 7, chord: "FaM", position: 27 },
        { line: 7, chord: "SolM", position: 33 },
        { line: 7, chord: "Lam", position: 45 },
        { line: 8, chord: "Lam", position: 0 },
        { line: 8, chord: "FaM", position: 16 },
        { line: 8, chord: "SolM", position: 27 },
        { line: 8, chord: "Lam", position: 45 },
        { line: 10, chord: "DoM", position: 0 },
        { line: 10, chord: "Faad9", position: 22 },
        { line: 10, chord: "DoM", position: 35 },
        { line: 10, chord: "Faad9", position: 45 },
        { line: 11, chord: "Sid", position: 0 },
        { line: 11, chord: "MiM", position: 25 },
        { line: 11, chord: "Lam", position: 37 },
        { line: 12, chord: "FaM", position: 0 },
        { line: 12, chord: "SolM", position: 16 },
        { line: 13, chord: "FaM", position: 0 },
        { line: 13, chord: "DoM", position: 20 },
        { line: 15, chord: "Lam", position: 0 },
        { line: 15, chord: "FaM", position: 31 },
        { line: 15, chord: "SolM", position: 36 },
        { line: 15, chord: "Lam", position: 45 },
        { line: 16, chord: "Lam", position: 0 },
        { line: 16, chord: "FaM", position: 16 },
        { line: 16, chord: "SolM", position: 27 },
        { line: 16, chord: "Lam", position: 45 },
        { line: 17, chord: "Lam", position: 0 },
        { line: 17, chord: "FaM", position: 16 },
        { line: 17, chord: "SolM", position: 27 },
        { line: 17, chord: "Lam", position: 45 },
        { line: 18, chord: "Lam", position: 0 },
        { line: 18, chord: "FaM", position: 16 },
        { line: 18, chord: "SolM", position: 27 },
        { line: 18, chord: "Lam", position: 45 },
        { line: 20, chord: "DoM", position: 0 },
        { line: 20, chord: "Faad9", position: 22 },
        { line: 20, chord: "DoM", position: 35 },
        { line: 20, chord: "Faad9", position: 45 },
        { line: 21, chord: "Sid", position: 0 },
        { line: 21, chord: "MiM", position: 25 },
        { line: 21, chord: "Lam", position: 39 },
        { line: 22, chord: "FaM", position: 0 },
        { line: 22, chord: "SolM", position: 16 },
        { line: 23, chord: "FaM", position: 0 },
        { line: 23, chord: "DoM", position: 20 },
        { line: 25, chord: "Lam", position: 0 },
        { line: 25, chord: "FaM", position: 16 },
        { line: 25, chord: "SolM", position: 27 },
        { line: 25, chord: "Lam", position: 45 },
        { line: 26, chord: "Lam", position: 0 },
        { line: 26, chord: "FaM", position: 16 },
        { line: 26, chord: "SolM", position: 27 },
        { line: 26, chord: "Lam", position: 45 },
        { line: 27, chord: "Lam", position: 0 },
        { line: 27, chord: "FaM", position: 16 },
        { line: 27, chord: "SolM", position: 27 },
        { line: 27, chord: "Lam", position: 45 },
        { line: 28, chord: "Lam", position: 0 },
        { line: 28, chord: "FaM", position: 16 },
        { line: 28, chord: "SolM", position: 27 },
        { line: 28, chord: "Lam", position: 45 }
      ]
    },
    {
      title: "Riñihue",
      year: "2002",
      location: "Riñihue",
      lyrics: `Cuando apagas el día y preparas el fuego,
y se enciende una cruz que señala hacia el sur.
Cuelgas el pañolín y te asomas al sueño,
esperando que el guardia diga que eres tú…

El que debe salir a enfrentar la noche,
el que debe partir para buscar.
Para iluminar lo que este bosque esconde,
los secretos que el viento nos quiere contar.

Otro día que nace y te acoge en sus manos,
calzarse el pañolín en el cuello y luchar;
El recuerdo del cielo nocturno en verano
revive el campamento en cada despertar.

Sé quien deba salir a enfrentar la noche,
El que debe salir a buscar.
Para iluminar lo que este bosque esconde,
los secretos que el viento nos quiere contar. 
(bis)`,
      chords: true,
      chordData: [
        { line: 0, chord: "Em", position: 0 },
        { line: 0, chord: "D", position: 47 },
        { line: 1, chord: "C", position: 0 },
        { line: 1, chord: "B7", position: 47 },
        { line: 2, chord: "G", position: 0 },
        { line: 2, chord: "D", position: 47 },
        { line: 3, chord: "C", position: 0 },
        { line: 3, chord: "B7", position: 46 },
        { line: 5, chord: "G", position: 0 },
        { line: 5, chord: "D", position: 15 },
        { line: 5, chord: "C", position: 44 },
        { line: 5, chord: "D", position: 46 },
        { line: 5, chord: "Em", position: 56 },
        { line: 6, chord: "G", position: 0 },
        { line: 6, chord: "D", position: 28 },
        { line: 6, chord: "C", position: 40 },
        { line: 7, chord: "G", position: 0 },
        { line: 7, chord: "D", position: 17 },
        { line: 7, chord: "C", position: 51 },
        { line: 7, chord: "D", position: 54 },
        { line: 7, chord: "Em", position: 62 },
        { line: 8, chord: "G", position: 0 },
        { line: 8, chord: "D", position: 35 },
        { line: 8, chord: "C", position: 68 },
        { line: 10, chord: "Em", position: 0 },
        { line: 10, chord: "D", position: 47 },
        { line: 11, chord: "C", position: 0 },
        { line: 11, chord: "B7", position: 47 },
        { line: 12, chord: "G", position: 0 },
        { line: 12, chord: "D", position: 47 },
        { line: 13, chord: "C", position: 0 },
        { line: 13, chord: "B7", position: 47 }
      ]
    },
    {
      title: "Nahuelhuapi",
      year: "2003",
      location: "Nahuelhuapi",
      lyrics: `Me armo con la carpa y el hacha,
vengo a conquistar este lugar.
Tomo posesión del lago que corre,
trepo viejos coihues vengo a cazar.

Cae el filo en el madero,
dejo huella al caminar.
Levanto, amarro y estrecho el tiempo,
y en la lluvia se escucha mi cantar.

El sol me calma al despertar,
el trabajo vuelve mi piel oscura.
Dentro de la tropa vivo en amistad,
mi mirada está lejana y profunda.

Cae el filo en el madero, 
dejo huella al caminar.
Levanto, amarro y estrecho el tiempo,
y en la lluvia se escucha mi cantar.


Vine a conquistar y fui conquistado,
mi enemigo fue más que colosal.
Este corazón resultó transformado,
mi mente cedió a lo natural.

Fui tallado en altos vientos,
remotas estrellas me indican como andar.
El campamento fue abandonado,
y la lluvia es mi único cantar.`,
      chords: true,
      youtubeLink: "https://www.youtube.com/watch?v=ZK1Xj7P5QU0",
      chordData: [
        { line: 0, chord: "Am", position: 0 },
        { line: 0, chord: "G", position: 36 },
        { line: 1, chord: "F", position: 0 },
        { line: 1, chord: "E", position: 28 },
        { line: 2, chord: "Am", position: 0 },
        { line: 2, chord: "G", position: 36 },
        { line: 3, chord: "F", position: 0 },
        { line: 3, chord: "E", position: 30 },
        { line: 5, chord: "F", position: 0 },
        { line: 5, chord: "C", position: 17 },
        { line: 6, chord: "Bdis", position: 0 },
        { line: 6, chord: "E", position: 19 },
        { line: 7, chord: "F", position: 0 },
        { line: 7, chord: "C", position: 28 },
        { line: 8, chord: "Bdis", position: 0 },
        { line: 8, chord: "E", position: 15 },
        { line: 8, chord: "Am", position: 41 },
        { line: 10, chord: "Am", position: 0 },
        { line: 10, chord: "G", position: 36 },
        { line: 11, chord: "F", position: 0 },
        { line: 11, chord: "E", position: 28 },
        { line: 12, chord: "Am", position: 0 },
        { line: 12, chord: "G", position: 36 },
        { line: 13, chord: "F", position: 0 },
        { line: 13, chord: "E", position: 30 },
        { line: 15, chord: "F", position: 0 },
        { line: 15, chord: "C", position: 17 },
        { line: 16, chord: "Bdis", position: 0 },
        { line: 16, chord: "E", position: 19 },
        { line: 17, chord: "F", position: 0 },
        { line: 17, chord: "C", position: 28 },
        { line: 18, chord: "Bdis", position: 0 },
        { line: 18, chord: "E", position: 15 },
        { line: 18, chord: "Am", position: 41 },
        { line: 20, chord: "Am", position: 0 },
        { line: 20, chord: "G", position: 36 },
        { line: 21, chord: "F", position: 0 },
        { line: 21, chord: "E", position: 28 },
        { line: 22, chord: "Am", position: 0 },
        { line: 22, chord: "G", position: 36 },
        { line: 23, chord: "F", position: 0 },
        { line: 23, chord: "E", position: 30 },
        { line: 25, chord: "F", position: 0 },
        { line: 25, chord: "C", position: 17 },
        { line: 26, chord: "Bdis", position: 0 },
        { line: 26, chord: "E", position: 19 },
        { line: 27, chord: "F", position: 0 },
        { line: 27, chord: "C", position: 28 },
        { line: 28, chord: "Bdis", position: 0 },
        { line: 28, chord: "E", position: 15 },
        { line: 28, chord: "Am", position: 41 }
      ]
    },
    {
      title: "Vilches",
      year: "2004",
      location: "Vilches",
      lyrics: `Hoy al despertarme vi primero el pañolín
Lo tomé en mis manos y salí corriendo

Ni siquiera estaba claro y los gritos se hicieron 
de puente entre el sueño profundo y el juego
nocturno cariñosamente

Y si decidí venir
Y subirme a nuestro bus
Sólo para ver salir la cruz del sur

Si me pongo el pañolín 
y no dejo de sentir
El camino se hace corto
y que el bosque me habla a mí

Es porque ahora tengo fuego en la mirada
Un motivo, una promesa
Una forma de vivir
Me acompaña en la aventura la certeza 
De que mi patrulla empieza                                    
A enseñarme a ver y a oír.

Esta noche canto entorno al fuego del fogón
Las estrellas bailan sobre mi cabeza
La tropa levanta llamas en cada canción
Y su voz se enciende y tiene nuevas fuerzas
   
Es porque ahora tengo fuego en la mirada… (BIS)`,
      chords: true,
      youtubeLink: "https://www.youtube.com/watch?v=fXkrFe-WT3g",
      chordData: [
        { line: 0, chord: "D", position: 0 },
        { line: 0, chord: "C", position: 38 },
        { line: 1, chord: "G", position: 0 },
        { line: 1, chord: "D", position: 33 },
        { line: 3, chord: "D", position: 0 },
        { line: 3, chord: "C", position: 38 },
        { line: 4, chord: "G", position: 0 },
        { line: 4, chord: "D", position: 42 },
        { line: 6, chord: "C", position: 8 },
        { line: 6, chord: "Em", position: 22 },
        { line: 7, chord: "C", position: 8 },
        { line: 7, chord: "Em", position: 29 },
        { line: 8, chord: "C", position: 9 },
        { line: 8, chord: "Em", position: 37 },
        { line: 10, chord: "C", position: 12 },
        { line: 10, chord: "Em", position: 25 },
        { line: 11, chord: "C", position: 12 },
        { line: 11, chord: "Em", position: 28 },
        { line: 12, chord: "C", position: 0 },
        { line: 12, chord: "A", position: 29 },
        { line: 14, chord: "G", position: 20 },
        { line: 14, chord: "A", position: 37 },
        { line: 14, chord: "G", position: 57 },
        { line: 14, chord: "A", position: 59 },
        { line: 15, chord: "Em", position: 13 },
        { line: 15, chord: "F#m", position: 35 },
        { line: 16, chord: "G", position: 9 },
        { line: 16, chord: "A", position: 28 },
        { line: 17, chord: "C", position: 18 },
        { line: 17, chord: "G", position: 49 },
        { line: 18, chord: "Am", position: 32 },
        { line: 19, chord: "D", position: 28 },
        { line: 21, chord: "D", position: 0 },
        { line: 21, chord: "C", position: 38 },
        { line: 22, chord: "G", position: 0 },
        { line: 22, chord: "D", position: 33 },
        { line: 23, chord: "D", position: 0 },
        { line: 23, chord: "C", position: 38 },
        { line: 24, chord: "G", position: 0 },
        { line: 24, chord: "D", position: 42 }
      ]
    },
    {
      title: "Enco-Panguipulli",
      year: "2005",
      location: "Enco-Panguipulli",
      lyrics: `Los cuentos siempre parten sin que puedas recordar
Que el miedo y la alegría tal vez se repetirán
Mochilas campamentos, carpas no renacerán
O eres feliz ahora, tarde lo extrañarás

No me iré, sin tener, otra vez
Una historia que recordar

La lluvia, caminatas, largas noches sin dormir
Los bosques nos esperan, lagos ya podrán venir
El frío que conservo nunca más lo sentiré
Si no me armo de nuevo, salgo, ya regresaré
No me iré, sin tener, otra vez
Una historia que recordar

Puedo irme mañana y no volver a sentir
El fuego y mis amigos me obligaban a reír
Todo lo que me llevo lo conservo para mí
Haré así nuevos cuentos de lo que aquí viví

No me iré, sin tener, otra vez
Una historia que recordar…`,
      chords: true,
      chordData: [
        { line: 0, chord: "La", position: 0 },
        { line: 0, chord: "Re", position: 40 },
        { line: 1, chord: "Mi", position: 12 },
        { line: 1, chord: "La", position: 46 },
        { line: 2, chord: "La", position: 0 },
        { line: 2, chord: "Re", position: 40 },
        { line: 3, chord: "Mi", position: 5 },
        { line: 3, chord: "La", position: 30 },
        { line: 5, chord: "Fa#m", position: 12 },
        { line: 5, chord: "Do#m", position: 24 },
        { line: 5, chord: "Re", position: 35 },
        { line: 6, chord: "Mi", position: 12 },
        { line: 6, chord: "La", position: 29 },
        { line: 8, chord: "La", position: 0 },
        { line: 8, chord: "Re", position: 28 },
        { line: 9, chord: "Mi", position: 7 },
        { line: 9, chord: "La", position: 41 },
        { line: 10, chord: "La", position: 0 },
        { line: 10, chord: "Re", position: 29 },
        { line: 11, chord: "Mi", position: 4 },
        { line: 11, chord: "La", position: 43 },
        { line: 12, chord: "Fa#m", position: 12 },
        { line: 12, chord: "Do#m", position: 23 },
        { line: 12, chord: "Re", position: 35 },
        { line: 13, chord: "Mi", position: 12 },
        { line: 13, chord: "La", position: 30 },
        { line: 15, chord: "La", position: 0 },
        { line: 15, chord: "Re", position: 33 },
        { line: 16, chord: "Mi", position: 4 },
        { line: 16, chord: "La", position: 38 },
        { line: 17, chord: "La", position: 0 },
        { line: 17, chord: "Re", position: 31 },
        { line: 18, chord: "Mi", position: 0 },
        { line: 18, chord: "La", position: 40 },
        { line: 20, chord: "Fa#m", position: 12 },
        { line: 20, chord: "Do#m", position: 22 },
        { line: 20, chord: "Re", position: 35 },
        { line: 21, chord: "Mi", position: 12 },
        { line: 21, chord: "La", position: 30 }
      ]
    },
    {
      title: "Rupanco CANASI",
      year: "2006",
      location: "Rupanco CANASI",
      lyrics: `Entre un lago y un gran cerro     
                                 
Venimos a buscar            
                            
Entre tierras sin nombres       
                      
Un mundo y amistad                                  
                                               
                        
Mientras el agua cae eterna

Desde el norte hasta el sur

Somos todo el mundo

E ignacianos por montón


Cruzaremos todos los mares

Abrazaremos nuestra canción

Daremos un giro libre

Entre el árbol y el fogón


Contra el viento y marea

La amistad florecerá

Construyamos un mundo 

Con luz y sin maldad.


Forjaremos una historia

Realmente digna de contar 

Todos juntos como hermanos

San Luis cantará


Cruzaremos todos los mares

Abrazaremos nuestra canción

Daremos un giro libre

Entre el árbol y el fogón`,
      chords: false
    },
    {
      title: "Puelo",
      year: "2007",
      location: "Puelo",
      lyrics: `Los magos lo advirtieron 
El bosque me pedía más
Una carnada
Tal vez ayudará.

La meta era precisa 
Corría en la oscuridad
La luz del guardia
No me descubrirá.

Y estaba ahí 
Cuidando algo en su cubil 
Yo no lo vi
Cuando ya estaba sobre mí.

Ah, mañana no me atraparás
Ni estarás cerca
No tendré miedo al despertar
Ah, nuestras miradas tienen paz
La voz del río
Y hechizos en la oscuridad

Las piedras una a una 
Pintadas me protegerán 
El fuego eterno
No se consumirá.

Los gritos patrulleros 
El juego hoy no acabará
El mago verde
Me lo revelará

Y estaba ahí 
Cuidando algo en su cubil 
Yo no lo vi
Cuando ya estaba sobre mí.

Ah, mañana no me atraparás      
Ni estarás cerca
No tendré miedo al despertar
Ah, nuestras miradas tienen paz
La voz del río
Y hechizos en la oscuridad 
(BIS).`,
      chords: true,
      chordData: [
        { line: 0, chord: "G", position: 0 },
        { line: 1, chord: "D", position: 28 },
        { line: 2, chord: "C", position: 15 },
        { line: 3, chord: "G", position: 29 },
        { line: 5, chord: "G", position: 0 },
        { line: 6, chord: "D", position: 15 },
        { line: 7, chord: "C", position: 19 },
        { line: 8, chord: "G", position: 29 },
        { line: 10, chord: "Em", position: 9 },
        { line: 11, chord: "Bm", position: 19 },
        { line: 12, chord: "Em", position: 9 },
        { line: 13, chord: "D", position: 26 },
        { line: 15, chord: "G", position: 0 },
        { line: 15, chord: "D", position: 29 },
        { line: 16, chord: "C", position: 13 },
        { line: 17, chord: "F", position: 21 },
        { line: 17, chord: "C", position: 48 },
        { line: 18, chord: "G", position: 0 },
        { line: 18, chord: "D", position: 28 },
        { line: 19, chord: "C", position: 13 },
        { line: 20, chord: "F", position: 21 },
        { line: 20, chord: "C", position: 48 },
        { line: 22, chord: "G", position: 0 },
        { line: 23, chord: "D", position: 28 },
        { line: 24, chord: "C", position: 19 },
        { line: 25, chord: "G", position: 29 },
        { line: 27, chord: "G", position: 0 },
        { line: 28, chord: "D", position: 15 },
        { line: 29, chord: "C", position: 19 },
        { line: 30, chord: "G", position: 29 },
        { line: 32, chord: "Em", position: 9 },
        { line: 33, chord: "Bm", position: 19 },
        { line: 34, chord: "Em", position: 9 },
        { line: 35, chord: "D", position: 26 }
      ]
    },
    {
      title: "Bullileo",
      year: "2008",
      location: "Bullileo",
      lyrics: `Regreso del centro, de lejos, en este tren viejo
Que hacia atrás
Nos llevará

Y traigo conmigo aquel miedo al viajero, al lejano, al caballo
Que en la noche tibia
Me acechará


Arrójate, confía en este sol, te secará
La la la la la
Y tírate, límpiate en las aguas de Kai Kai Vilú,  
de Kai 
Kai...



La noche tranquila es la magia del bosque
La magia que el huinca de ayer
Quiso robar


Escóndete, busca, camina en silencio
Recoge del sueño su mejor momento
Nos gritan los dioses se acaba el momento
Corremos al tren ahora todo es más nuevo

Arrójate, confía en este sol, te secará
La la la la la
Y tírate, límpiate en las aguas de Kai Kai Vilú,
de Kai
Kai Kai…`,
      chords: true,
      chordData: [
        { line: 0, chord: "Amaj7", position: 0 },
        { line: 1, chord: "Dmaj7", position: 13 },
        { line: 3, chord: "Amaj7", position: 0 },
        { line: 4, chord: "Dmaj7", position: 13 },
        { line: 7, chord: "Bm7", position: 0 },
        { line: 7, chord: "Cm#7", position: 25 },
        { line: 7, chord: "Bm7", position: 55 },
        { line: 8, chord: "E", position: 0 },
        { line: 9, chord: "Bm7", position: 0 },
        { line: 9, chord: "Cm#7", position: 30 },
        { line: 9, chord: "Bm7", position: 75 },
        { line: 10, chord: "Cm#7", position: 0 },
        { line: 11, chord: "Bm7", position: 5 },
        { line: 11, chord: "Cm#7", position: 13 },
        { line: 14, chord: "Amaj7", position: 0 },
        { line: 15, chord: "Dmaj7", position: 13 },
        { line: 18, chord: "Amaj7", position: 0 },
        { line: 18, chord: "Dmaj7", position: 47 },
        { line: 19, chord: "Amaj7", position: 0 },
        { line: 19, chord: "Dmaj7", position: 47 },
        { line: 20, chord: "Amaj7", position: 0 },
        { line: 20, chord: "Dmaj7", position: 47 },
        { line: 21, chord: "Amaj7", position: 0 },
        { line: 21, chord: "Dmaj7", position: 47 },
        { line: 23, chord: "Bm7", position: 0 },
        { line: 23, chord: "Cm#7", position: 25 },
        { line: 23, chord: "Bm7", position: 53 },
        { line: 24, chord: "E", position: 0 },
        { line: 25, chord: "Bm7", position: 0 },
        { line: 25, chord: "Cm#7", position: 30 },
        { line: 25, chord: "Bm7", position: 75 },
        { line: 26, chord: "Cm#7", position: 8 },
        { line: 27, chord: "Bm7", position: 5 },
        { line: 27, chord: "Cm#7", position: 13 }
      ]
    },
    {
      title: "Las Compuertas, Chiloé",
      year: "2009",
      location: "Las Compuertas, Chiloé",
      lyrics: `Antes de partir recuerda
Lo que hay que llevar
No traigas nada extra
Tu patrulla te va a cuidar

Antes de correr recuerda
Hay que caminar
Y antes de dormir recuerda 
Hay que trabajar

La tropa más allá de tierra firme, va a cruzar
Ni el frío, ni la lluvia, ni el camino
Te detendrán.

Antes de volver cansado 
Anímate a jugar
Antes de guardar la mano
Al amigo hay que levantar

La tropa más allá de tierra firme, va a cruzar
Las estrellas, el bosque y sus caminos 
Te guiarán 

Antes de que se apague el fuego
Te invito a rezar
Desde que amanezca
Un secreto hay que guardar

La tropa más allá de tierra firme, va a cruzar (BIS).`,
      chords: true,
      chordData: [
        { line: 0, chord: "E", position: 0 },
        { line: 0, chord: "Esus4", position: 26 },
        { line: 1, chord: "F#m", position: 0 },
        { line: 2, chord: "D", position: 0 },
        { line: 3, chord: "A", position: 19 },
        { line: 5, chord: "E", position: 0 },
        { line: 5, chord: "Esus4", position: 26 },
        { line: 6, chord: "F#m", position: 0 },
        { line: 7, chord: "D", position: 0 },
        { line: 8, chord: "A", position: 16 },
        { line: 10, chord: "G", position: 0 },
        { line: 10, chord: "D", position: 25 },
        { line: 10, chord: "A", position: 51 },
        { line: 11, chord: "G", position: 0 },
        { line: 11, chord: "D", position: 33 },
        { line: 12, chord: "A", position: 13 },
        { line: 14, chord: "E", position: 0 },
        { line: 14, chord: "Esus4", position: 26 },
        { line: 15, chord: "F#m", position: 0 },
        { line: 16, chord: "D", position: 0 },
        { line: 17, chord: "A", position: 25 },
        { line: 19, chord: "G", position: 0 },
        { line: 19, chord: "D", position: 25 },
        { line: 19, chord: "A", position: 51 },
        { line: 20, chord: "G", position: 0 },
        { line: 20, chord: "D", position: 33 },
        { line: 21, chord: "A", position: 11 },
        { line: 23, chord: "E", position: 0 },
        { line: 23, chord: "Esus4", position: 26 },
        { line: 24, chord: "F#m", position: 0 },
        { line: 25, chord: "D", position: 0 },
        { line: 26, chord: "A", position: 22 },
        { line: 28, chord: "G", position: 0 },
        { line: 28, chord: "D", position: 25 },
        { line: 28, chord: "A", position: 51 }
      ]
    },
    {
      title: "Ranco",
      year: "2011",
      location: "Ranco",
      lyrics: `La lluvia nos marcó el arribo al lugar
Las gotas compartían la emoción
Y a pesar del frío y la humedad 
Miradas me protegen esta noche al descansar.
 
El fuego en la velada acompaña al conversar
Amigos que me escuchan y me enseñan a soñar.  

 
Esta historia
Se escribe con tus pasos
Firmes al andar
Adelante, la ley y la promesa
Te iluminarán
 
A la noche la neblina nos cubrió
Que fue lo que escondió
Las miradas del pueblo que gritó
Luego la mano ocultó.
 
Despierto y cada día es un camino que tomar
Elijo la pureza y la pasión al caminar.
 
Esta historia…

La noche enciende estrellas que acompañan al cantar
La tropa en el fogón se despide del lugar
No escondo el deseo de volver a regresar
Soy guardián de una leyenda que contar.
 
Ajusto mi mochila y empiezo a caminar
Haré de este paisaje un lugar por conquistar.

Esta historia…
(bis)`,
      chords: true,
      chordData: [
        { line: 0, chord: "E", position: 0 },
        { line: 0, chord: "F#", position: 39 },
        { line: 1, chord: "A9", position: 7 },
        { line: 1, chord: "E", position: 40 },
        { line: 2, chord: "F#", position: 24 },
        { line: 3, chord: "A9", position: 4 },
        { line: 3, chord: "E", position: 51 },
        { line: 5, chord: "F#m", position: 5 },
        { line: 5, chord: "G#m", position: 47 },
        { line: 6, chord: "F#m", position: 4 },
        { line: 6, chord: "B7", position: 46 },
        { line: 9, chord: "E", position: 0 },
        { line: 9, chord: "C", position: 12 },
        { line: 10, chord: "G", position: 6 },
        { line: 11, chord: "B7", position: 0 },
        { line: 12, chord: "E", position: 0 },
        { line: 12, chord: "C", position: 10 },
        { line: 12, chord: "G", position: 21 },
        { line: 13, chord: "B7", position: 0 },
        { line: 15, chord: "E", position: 0 },
        { line: 15, chord: "F#", position: 39 },
        { line: 16, chord: "A9", position: 3 },
        { line: 16, chord: "E", position: 24 },
        { line: 17, chord: "F#", position: 24 },
        { line: 18, chord: "A9", position: 5 },
        { line: 18, chord: "E", position: 20 },
        { line: 20, chord: "F#m", position: 0 },
        { line: 20, chord: "B7", position: 49 },
        { line: 23, chord: "E", position: 0 },
        { line: 23, chord: "F#", position: 39 },
        { line: 24, chord: "A9", position: 0 },
        { line: 24, chord: "E", position: 40 },
        { line: 25, chord: "F#", position: 19 },
        { line: 26, chord: "A9", position: 5 },
        { line: 26, chord: "E", position: 30 },
        { line: 28, chord: "F#m", position: 0 },
        { line: 28, chord: "B7", position: 42 }
      ]
    },
    {
      title: "Malalcahuello",
      year: "2012",
      location: "Malalcahuello",
      lyrics: `Despierto y cargo mi mochila,
hoy comienza una nueva aventura
Lentamente nace un nuevo día
y mi ansiedad desborda con locura.



Emprendo viaje a tierras muy antiguas,
al lugar donde florece el pehuén,
allí donde vivió el precolombino
y me encuentro con la historia que ya fue.

Yo la reescribiré, con mi pañolín
Limpiándome las manos en la corriente del 
Cautín.

Milenarias araucarias me cubren
desde lo alto me observa sigiloso el Nahuel
Con pasión dejo mi huella en la memoria
de este suelo fértil bajo la aurora.

Las estrellas aparecen para iluminar
la cumbre donde el Pehuenche hizo su hogar.

Subo con mi Tropa hasta llegar
y contemplo admirado al místico Pillán.

Entre las quebradas, me canta el queltehue
recordándome la esencia de mi rehue.

Milenarias araucarias me cubren…  (BIS)`,
      chords: true,
      spotifyLink: "https://open.spotify.com/track/7kkDdM1HR5n9I4u9gZEbM4",
      spotifyEmbed: '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/7kkDdM1HR5n9I4u9gZEbM4?utm_source=generator" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
      composers: "Maximiliano Fuentes, Nicolás Bravo, Salvador Sacur",
      chordData: [
        { line: 0, chord: "C", position: 0 },
        { line: 0, chord: "Cmaj7", position: 19 },
        { line: 0, chord: "Em", position: 47 },
        { line: 1, chord: "F", position: 0 },
        { line: 1, chord: "C", position: 49 },
        { line: 2, chord: "Cmaj7", position: 25 },
        { line: 2, chord: "Em", position: 39 },
        { line: 3, chord: "F", position: 10 },
        { line: 3, chord: "G", position: 47 },
        { line: 6, chord: "C", position: 0 },
        { line: 6, chord: "Cmaj7", position: 29 },
        { line: 6, chord: "Em", position: 55 },
        { line: 7, chord: "F", position: 0 },
        { line: 7, chord: "C", position: 42 },
        { line: 8, chord: "C", position: 0 },
        { line: 8, chord: "Cmaj7", position: 22 },
        { line: 8, chord: "Em", position: 49 },
        { line: 9, chord: "F", position: 0 },
        { line: 9, chord: "G", position: 47 },
        { line: 11, chord: "Em", position: 0 },
        { line: 11, chord: "Am", position: 21 },
        { line: 11, chord: "Em", position: 26 },
        { line: 11, chord: "Am", position: 39 },
        { line: 12, chord: "F", position: 9 },
        { line: 13, chord: "G", position: 43 },
        { line: 13, chord: "G7", position: 57 },
        { line: 15, chord: "C", position: 0 },
        { line: 15, chord: "Cmaj7", position: 7 },
        { line: 15, chord: "Em", position: 46 },
        { line: 16, chord: "F", position: 18 },
        { line: 16, chord: "G", position: 38 },
        { line: 16, chord: "C", position: 47 },
        { line: 17, chord: "Cmaj7", position: 14 },
        { line: 17, chord: "Em", position: 47 },
        { line: 18, chord: "F", position: 15 },
        { line: 18, chord: "G", position: 31 },
        { line: 18, chord: "C", position: 40 },
        { line: 20, chord: "C", position: 0 },
        { line: 20, chord: "Cmaj7", position: 29 },
        { line: 20, chord: "Em", position: 55 },
        { line: 21, chord: "F", position: 0 },
        { line: 21, chord: "C", position: 42 },
        { line: 23, chord: "C", position: 0 },
        { line: 23, chord: "Cmaj7", position: 22 },
        { line: 23, chord: "Em", position: 49 },
        { line: 24, chord: "F", position: 0 },
        { line: 24, chord: "G", position: 47 },
        { line: 26, chord: "Em", position: 0 },
        { line: 26, chord: "Am", position: 21 },
        { line: 26, chord: "Em", position: 26 },
        { line: 26, chord: "Am", position: 39 },
        { line: 27, chord: "F", position: 6 },
        { line: 27, chord: "G", position: 35 },
        { line: 27, chord: "G7", position: 51 }
      ]
    },
    {
      title: "Atacalco",
      year: "2013",
      location: "Atacalco",
      lyrics: `He venido aquí, huyendo de mi rutina, con 
mi canto con mi risa, ansioso de compartir.
He venido aquí, bajo una noche sin luna, 
descubriendo nuestra historia en mi tally.

Hago de los bosques tan tupidos un hogar, 
hago de mis pasos una historia que contar,
con una patrulla que conmigo estará,             
en el alba en el día y en la oscuridad.

Juego bajo un sol que no pretende descansar, 
danzo bajo estrellas que me invitan a encontrar 
un camino iluminado por la Ley Scout.

He venido aquí…

Escucho la brisa y me adentro en su viajar,
recorro cerros, valles, ríos que me enseñarán, 
el secreto que profundo en la naturaleza está.


Hoy vengo a vivir un día que sé que se irá, 
pero que a la Tropa fundirá en amistad,
no será lo mismo haberse quedado en ciudad,
cuando junto a mi patrulla aprenda a caminar.

He venido aquí…`,
      chords: true,
      chordData: [
        { line: 0, chord: "F#m", position: 0 },
        { line: 0, chord: "E", position: 15 },
        { line: 0, chord: "D", position: 20 },
        { line: 0, chord: "A", position: 43 },
        { line: 0, chord: "Bm", position: 59 },
        { line: 1, chord: "A", position: 16 },
        { line: 1, chord: "Bm", position: 30 },
        { line: 1, chord: "C#7", position: 39 },
        { line: 2, chord: "F#m", position: 0 },
        { line: 2, chord: "E", position: 15 },
        { line: 2, chord: "D", position: 20 },
        { line: 2, chord: "A", position: 40 },
        { line: 3, chord: "Bm", position: 0 },
        { line: 3, chord: "A", position: 24 },
        { line: 3, chord: "C#7", position: 31 },
        { line: 5, chord: "F#m", position: 0 },
        { line: 5, chord: "E", position: 33 },
        { line: 6, chord: "D", position: 0 },
        { line: 6, chord: "A", position: 28 },
        { line: 7, chord: "D", position: 0 },
        { line: 7, chord: "A", position: 29 },
        { line: 8, chord: "Bm", position: 0 },
        { line: 8, chord: "C#7", position: 25 },
        { line: 10, chord: "F#m", position: 0 },
        { line: 10, chord: "E", position: 40 },
        { line: 11, chord: "D", position: 0 },
        { line: 11, chord: "A", position: 38 },
        { line: 12, chord: "Bm", position: 0 },
        { line: 12, chord: "C#7", position: 26 }
      ]
    },
    {
      title: "Pedregoso",
      year: "2014",
      location: "Pedregoso",
      lyrics: `El río fluye y trae consigo
Historias que quiero olvidar
Sobre hombres maldecidos
Viejos enfermos de soledad
 
Fuimos jóvenes alguna vez
Ya volveremos a serlo de nuevo
Esa gitana no ganará
Saldremos de este asilo, escaparemos
 
La lluvia nos despertó
Y nos inundó de sorpresas
Se llevó recuerdos
Que no volverán nunca más.
 
Nos trajo luego un brillante sol
Que nos llenó de risas
Y nos guió en la oscuridad
De este infierno.
 
Fuimos jóvenes alguna vez… (bis)`,
      chords: true,
      spotifyLink: "https://open.spotify.com/track/5Ch1OOc48KnmBMVSZApLn2",
      spotifyEmbed: '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/5Ch1OOc48KnmBMVSZApLn2?utm_source=generator" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
      composers: "Salvador Sacur, Vicente Espinoza",
      chordData: [
        { line: 0, chord: "G", position: 0 },
        { line: 0, chord: "C", position: 26 },
        { line: 1, chord: "Em", position: 5 },
        { line: 1, chord: "D", position: 29 },
        { line: 2, chord: "G", position: 0 },
        { line: 2, chord: "C", position: 28 },
        { line: 3, chord: "D", position: 0 },
        { line: 3, chord: "D7", position: 26 },
        { line: 5, chord: "Bm", position: 0 },
        { line: 5, chord: "Em", position: 27 },
        { line: 6, chord: "A", position: 17 },
        { line: 6, chord: "A7", position: 28 },
        { line: 6, chord: "C", position: 37 },
        { line: 6, chord: "D", position: 42 },
        { line: 7, chord: "Bm", position: 0 },
        { line: 7, chord: "Em", position: 21 },
        { line: 8, chord: "A", position: 0 },
        { line: 8, chord: "A7", position: 33 },
        { line: 8, chord: "Am7", position: 36 },
        { line: 8, chord: "D", position: 46 },
        { line: 10, chord: "G", position: 0 },
        { line: 10, chord: "C", position: 26 },
        { line: 11, chord: "Em", position: 5 },
        { line: 11, chord: "D", position: 29 },
        { line: 12, chord: "G", position: 0 },
        { line: 12, chord: "C", position: 28 },
        { line: 13, chord: "D", position: 0 },
        { line: 13, chord: "D7", position: 26 },
        { line: 15, chord: "Bm", position: 0 },
        { line: 15, chord: "Em", position: 27 },
        { line: 16, chord: "A", position: 17 },
        { line: 16, chord: "A7", position: 28 },
        { line: 16, chord: "C", position: 37 },
        { line: 16, chord: "D", position: 42 },
        { line: 17, chord: "Bm", position: 0 },
        { line: 17, chord: "Em", position: 21 },
        { line: 18, chord: "A", position: 0 },
        { line: 18, chord: "A7", position: 33 },
        { line: 18, chord: "Am7", position: 36 },
        { line: 18, chord: "D", position: 46 }
      ]
    },
    {
      title: "Rupanco",
      year: "2015",
      location: "Rupanco",
      lyrics: `El lago y el bosque que no tiene fin
al rojo y blanco reciben aquí,
donde el sol no descansa y alumbra 
hasta que las estrellas deciden salir.
 
Los juegos del día dan paso a observar
el hogar de los robles y el arrayán.
En la noche sin luna el zorro saldrá
y su guardia nos protegerá.
 
El salto a lo lejos que cae
y renueva sus aguas sin cesar
es como mi tropa que fluye
y nada la extinguirá.  (bis)

Las olas del lago resuenan bajo
la neblina del amanecer.
Con mis compañeros yo dejaré
el corazón en el raid que emprenderé.


El salto a lo lejos que cae
y renueva sus aguas sin cesar
es como mi tropa que fluye
y nada la extinguirá.  (bis)`,
      chords: true,
      composers: "Salvador Sacur",
      chordData: [
        { line: 0, chord: "Gm", position: 4 },
        { line: 0, chord: "C7", position: 42 },
        { line: 1, chord: "Gm", position: 4 },
        { line: 1, chord: "C7", position: 31 },
        { line: 2, chord: "Gm", position: 16 },
        { line: 2, chord: "C7", position: 46 },
        { line: 3, chord: "Dm", position: 31 },
        { line: 3, chord: "D7", position: 51 },
        { line: 5, chord: "Gm", position: 0 },
        { line: 5, chord: "C7", position: 42 },
        { line: 6, chord: "Gm", position: 0 },
        { line: 6, chord: "C7", position: 31 },
        { line: 7, chord: "Gm", position: 0 },
        { line: 7, chord: "C7", position: 46 },
        { line: 8, chord: "Dm", position: 0 },
        { line: 8, chord: "D7", position: 51 },
        { line: 10, chord: "Adis", position: 5 },
        { line: 10, chord: "D7", position: 28 },
        { line: 11, chord: "Fm", position: 8 },
        { line: 11, chord: "Bb7", position: 21 },
        { line: 11, chord: "Eb", position: 30 },
        { line: 12, chord: "Cm", position: 6 },
        { line: 12, chord: "D7", position: 30 },
        { line: 13, chord: "Gm", position: 23 },
        { line: 15, chord: "Gm", position: 4 },
        { line: 15, chord: "C7", position: 42 },
        { line: 16, chord: "Gm", position: 4 },
        { line: 16, chord: "C7", position: 31 },
        { line: 17, chord: "Gm", position: 16 },
        { line: 17, chord: "C7", position: 46 },
        { line: 18, chord: "Dm", position: 31 },
        { line: 18, chord: "D7", position: 51 },
        { line: 21, chord: "Adis", position: 6 },
        { line: 21, chord: "D7", position: 28 },
        { line: 22, chord: "Fm", position: 8 },
        { line: 22, chord: "Bb7", position: 21 },
        { line: 22, chord: "Eb", position: 30 },
        { line: 23, chord: "Cm", position: 6 },
        { line: 23, chord: "D7", position: 30 },
        { line: 24, chord: "Gm", position: 23 }
      ]
    },
    {
      title: "Cholguán",
      year: "2016",
      location: "Cholguán",
      lyrics: `Entre los bosques y el chirriar de los grillos está
la Patria y el Hogar que nos cobijará.

El viento, amigo, nos dirá cómo escuchar
las maravillas que la noche nos entregará.

Vamos a encontrar
los secretos de Cholguán
bajo la luz de las
luciérnagas. 

Tras las sombras se ocultan con sigilosidad
ladrones que intentan escapar de su prisión fatal.

Vamos a encontrar…`,
      chords: true,
      composers: "Salvador Sacur",
      chordData: [
        { line: 0, chord: "D", position: 0 },
        { line: 0, chord: "Bm", position: 18 },
        { line: 0, chord: "G", position: 30 },
        { line: 0, chord: "D", position: 49 },
        { line: 1, chord: "Bm", position: 11 },
        { line: 1, chord: "Em", position: 34 },
        { line: 1, chord: "A", position: 41 },
        { line: 3, chord: "D", position: 0 },
        { line: 3, chord: "Bm", position: 22 },
        { line: 3, chord: "G", position: 34 },
        { line: 3, chord: "D", position: 49 },
        { line: 4, chord: "Bm", position: 11 },
        { line: 4, chord: "Em", position: 22 },
        { line: 4, chord: "A", position: 41 },
        { line: 6, chord: "Bm", position: 0 },
        { line: 6, chord: "F#m", position: 16 },
        { line: 7, chord: "G", position: 17 },
        { line: 7, chord: "D", position: 36 },
        { line: 9, chord: "Bm", position: 9 },
        { line: 9, chord: "F#m", position: 20 },
        { line: 10, chord: "G", position: 0 },
        { line: 10, chord: "A", position: 17 },
        { line: 10, chord: "D", position: 25 },
        { line: 12, chord: "D", position: 0 },
        { line: 12, chord: "Bm", position: 18 },
        { line: 12, chord: "G", position: 30 },
        { line: 12, chord: "D", position: 49 },
        { line: 13, chord: "Bm", position: 11 },
        { line: 13, chord: "Em", position: 22 },
        { line: 13, chord: "A", position: 41 }
      ]
    },
    {
      title: "Maihue",
      year: "2019",
      location: "Maihue",
      lyrics: `Venimos de otro lugar
a escondernos en la soledad
El lago nos recibirá 
Su paz me calmará
Pero luego el enemigo vendrá
Quiere arrasar con nuestra unidad
Despierta, Cocina y Prepárate 
El canto del lago debemos salvar
Y cuando todos dejen de estar
Nuestro pasado podremos recordar
La amistad nos liberará
de aquel que busca inundar
la historia de este lugar 
es donde la Tropa se unirá
Pero luego el enemigo vendrá
Quiere arrasar con nuestro hogar

Despierta, Cocina y Prepárate 
El canto del lago debemos salvar
Y cuando todos dejen de estar
Nuestro pasado podremos recordar
El viento no dejó de hablar
Sus palabras son de unidad
La leña que yo usaré  
Son el fuego que me alimentará
La aventura que vivimos
No la olvidaré nunca más

Despierta, Cocina y Prepárate 
El canto del lago debemos salvar
Y cuando todos dejen de estar
Nuestro pasado podremos recordar.`,
      chords: true,
      composers: "",
      chordData: [
        { line: 0, chord: "G", position: 0 },
        { line: 0, chord: "Bm7", position: 26 },
        { line: 1, chord: "Am7", position: 0 },
        { line: 1, chord: "D", position: 28 },
        { line: 2, chord: "G", position: 0 },
        { line: 2, chord: "Bm7", position: 26 },
        { line: 3, chord: "Am7", position: 0 },
        { line: 3, chord: "D", position: 15 },
        { line: 4, chord: "Am7", position: 0 },
        { line: 4, chord: "D", position: 24 },
        { line: 5, chord: "Am7", position: 0 },
        { line: 5, chord: "B7", position: 35 },
        { line: 6, chord: "G", position: 0 },
        { line: 6, chord: "A7", position: 9 },
        { line: 6, chord: "C", position: 20 },
        { line: 6, chord: "D", position: 40 },
        { line: 7, chord: "G", position: 0 },
        { line: 7, chord: "A7", position: 15 },
        { line: 7, chord: "C", position: 31 },
        { line: 7, chord: "D", position: 38 },
        { line: 8, chord: "G", position: 0 },
        { line: 8, chord: "A7", position: 9 },
        { line: 8, chord: "C", position: 20 },
        { line: 8, chord: "D", position: 40 },
        { line: 9, chord: "G", position: 0 },
        { line: 9, chord: "A7", position: 15 },
        { line: 9, chord: "C", position: 31 },
        { line: 9, chord: "D", position: 38 },
        { line: 10, chord: "G", position: 0 },
        { line: 10, chord: "Bm7", position: 26 },
        { line: 11, chord: "Am7", position: 0 },
        { line: 11, chord: "D", position: 28 },
        { line: 12, chord: "G", position: 0 },
        { line: 12, chord: "Bm7", position: 26 },
        { line: 13, chord: "Am7", position: 0 },
        { line: 13, chord: "D", position: 15 },
        { line: 14, chord: "Am7", position: 0 },
        { line: 14, chord: "D", position: 24 },
        { line: 15, chord: "Am7", position: 0 },
        { line: 15, chord: "B7", position: 35 },
        { line: 17, chord: "G", position: 0 },
        { line: 17, chord: "A7", position: 9 },
        { line: 17, chord: "C", position: 20 },
        { line: 17, chord: "D", position: 40 },
        { line: 18, chord: "G", position: 0 },
        { line: 18, chord: "A7", position: 15 },
        { line: 18, chord: "C", position: 31 },
        { line: 18, chord: "D", position: 38 },
        { line: 19, chord: "G", position: 0 },
        { line: 19, chord: "A7", position: 9 },
        { line: 19, chord: "C", position: 20 },
        { line: 19, chord: "D", position: 40 },
        { line: 20, chord: "G", position: 0 },
        { line: 20, chord: "A7", position: 15 },
        { line: 20, chord: "C", position: 31 },
        { line: 20, chord: "D", position: 38 },
        { line: 21, chord: "G", position: 0 },
        { line: 21, chord: "Bm7", position: 26 },
        { line: 22, chord: "Am7", position: 0 },
        { line: 22, chord: "D", position: 28 },
        { line: 23, chord: "G", position: 0 },
        { line: 23, chord: "Bm7", position: 26 },
        { line: 24, chord: "Am7", position: 0 },
        { line: 24, chord: "D", position: 15 },
        { line: 25, chord: "Am7", position: 0 },
        { line: 25, chord: "D", position: 24 },
        { line: 26, chord: "Am7", position: 0 },
        { line: 26, chord: "B7", position: 35 },
        { line: 28, chord: "G", position: 0 },
        { line: 28, chord: "A7", position: 9 },
        { line: 28, chord: "C", position: 20 },
        { line: 28, chord: "D", position: 40 },
        { line: 29, chord: "G", position: 0 },
        { line: 29, chord: "A7", position: 15 },
        { line: 29, chord: "C", position: 31 },
        { line: 29, chord: "D", position: 38 },
        { line: 30, chord: "G", position: 0 },
        { line: 30, chord: "A7", position: 9 },
        { line: 30, chord: "C", position: 20 },
        { line: 30, chord: "D", position: 40 },
        { line: 31, chord: "G", position: 0 },
        { line: 31, chord: "A7", position: 15 },
        { line: 31, chord: "C", position: 31 },
        { line: 31, chord: "D", position: 38 }
      ]
    },
    {
      title: "Lircay",
      year: "2020",
      location: "Lircay",
      lyrics: `El río sereno fluye eterno,
bajo el firmamento de Lircay.
Vengo escapando desde el norte
de las calles rojas de esa ciudad.

Busco un lugar donde la brisa
meza a la hierba sin cesar.
No me importa el polvo ni el calor,
vine con mi Tropa a acampar.

Sin embargo, siento,
Que poco me queda.
Ya se va acabando,
quiero seguir cantando,
bajo el cielo.

Esta noche cantaré
hasta perder mi voz,
no me importa lo que digan.
Esta noche quiero verte
cantar hasta el alba,
tal vez sea la última vez…

Tengo la cara llena de tierra,
no te rías, lo hago por opción.

Siento nostalgia por mi patrulla
¿Cuántas aventuras faltarán?

Sin embargo, siento,
que poco me queda.
Ya se va acabando,
quiero seguir cantando,
bajo el cielo.

Esta noche cantaré
hasta perder mi voz,
no me importa lo que digan.
Esta noche quiero verte
cantar hasta el alba,
tal vez sea la última vez…
La última vez.`,
      chords: true,
      youtubeLink: "https://www.youtube.com/watch?v=LOBev1mCBrM",
      composers: "Marcelo Garcés",
      chordData: [
        { line: 0, chord: "C", position: 0 },
        { line: 0, chord: "Fmaj7", position: 26 },
        { line: 1, chord: "Am", position: 0 },
        { line: 1, chord: "Am/F#", position: 26 },
        { line: 2, chord: "C", position: 0 },
        { line: 2, chord: "Fmaj7", position: 32 },
        { line: 3, chord: "Am", position: 15 },
        { line: 3, chord: "Am/F#", position: 32 },
        { line: 5, chord: "C", position: 4 },
        { line: 5, chord: "Fmaj7", position: 27 },
        { line: 6, chord: "Am", position: 0 },
        { line: 6, chord: "Am/F#", position: 26 },
        { line: 7, chord: "C", position: 3 },
        { line: 7, chord: "Fmaj7", position: 33 },
        { line: 8, chord: "Am", position: 3 },
        { line: 8, chord: "Am/F#", position: 29 },
        { line: 8, chord: "F", position: 40 },
        { line: 10, chord: "C", position: 0 },
        { line: 10, chord: "Bdim7", position: 12 },
        { line: 11, chord: "Am", position: 26 },
        { line: 11, chord: "Am/G", position: 38 },
        { line: 11, chord: "F", position: 49 },
        { line: 12, chord: "C", position: 16 },
        { line: 12, chord: "Bdim7", position: 33 },
        { line: 13, chord: "Am", position: 25 },
        { line: 13, chord: "Am/G", position: 40 },
        { line: 14, chord: "F", position: 17 },
        { line: 14, chord: "Fm", position: 28 },
        { line: 16, chord: "C", position: 0 },
        { line: 16, chord: "Fm", position: 12 },
        { line: 16, chord: "Am", position: 24 },
        { line: 17, chord: "E7", position: 6 },
        { line: 17, chord: "F", position: 21 },
        { line: 18, chord: "Bdim7", position: 15 },
        { line: 18, chord: "F", position: 41 },
        { line: 18, chord: "Fm", position: 48 },
        { line: 19, chord: "C", position: 0 },
        { line: 19, chord: "Fm", position: 16 },
        { line: 19, chord: "Am", position: 28 },
        { line: 20, chord: "E7", position: 7 },
        { line: 20, chord: "F", position: 25 },
        { line: 21, chord: "Bdim7", position: 7 },
        { line: 21, chord: "F", position: 36 },
        { line: 21, chord: "Fm", position: 48 },
        { line: 23, chord: "C", position: 0 },
        { line: 25, chord: "C", position: 0 },
        { line: 25, chord: "Fmaj7", position: 32 },
        { line: 26, chord: "Am", position: 0 },
        { line: 26, chord: "Am/F#", position: 32 },
        { line: 28, chord: "C", position: 0 },
        { line: 28, chord: "Fmaj7", position: 34 },
        { line: 29, chord: "Am", position: 2 },
        { line: 29, chord: "Am/F#", position: 37 },
        { line: 29, chord: "F", position: 54 },
        { line: 32, chord: "C", position: 1 },
        { line: 32, chord: "Bdim7", position: 14 },
        { line: 33, chord: "Am", position: 25 },
        { line: 33, chord: "Am/G", position: 36 },
        { line: 33, chord: "F", position: 42 },
        { line: 34, chord: "C", position: 16 },
        { line: 34, chord: "Bdim7", position: 35 },
        { line: 35, chord: "Am", position: 25 },
        { line: 35, chord: "Am/G", position: 40 },
        { line: 36, chord: "F", position: 17 },
        { line: 36, chord: "Fm", position: 28 },
        { line: 38, chord: "C", position: 0 },
        { line: 38, chord: "Fm", position: 12 },
        { line: 38, chord: "Am", position: 24 },
        { line: 39, chord: "E7", position: 6 },
        { line: 39, chord: "F", position: 21 },
        { line: 40, chord: "Bdim7", position: 15 },
        { line: 40, chord: "F", position: 41 },
        { line: 40, chord: "Fm", position: 48 },
        { line: 41, chord: "C", position: 0 },
        { line: 41, chord: "Fm", position: 16 },
        { line: 41, chord: "Am", position: 28 },
        { line: 42, chord: "E7", position: 7 },
        { line: 42, chord: "F", position: 25 },
        { line: 43, chord: "Bdim7", position: 7 },
        { line: 43, chord: "F", position: 36 },
        { line: 43, chord: "Fm", position: 48 },
        { line: 44, chord: "C", position: 19 }
      ]
    },
    {
      title: "Cachapoal",
      year: "2023",
      location: "Cachapoal",
      lyrics: `Vuelvo al lugar donde
La vida alguna vez amé
Y me enfrento en la noche
A las sombras que mi carpa acechan
 
Volver y considerar
Que está pasión le falta al mundo
Volver y considerar
Que solo me hace falta el firmamento
 

Viejo caminante
Te vas lejos de acá
¿A dónde vas?
Si escucho el río tal vez me lo dirá
Quédate una noche más
Faltaron himnos, historias y sonrisas
Y cuando vuelvas
Enciende el fuego cuéntame de tu viaje
 
Vuelvo a caminar sin rumbo
Con las libélulas guiando el paso
Y la Tropa está de vuelta
Y con su canto el fuego encenderá
 
Volver y considerar
Que está pasión le falta al mundo
Volver y considerar
Que solo me hace falta el firmamento
 
Viejo caminante…`,
      chords: true,
      composers: "Marcelo Garcés",
      chordData: [
        { line: 0, chord: "G", position: 3 },
        { line: 0, chord: "Em", position: 22 },
        { line: 0, chord: "Bm", position: 29 },
        { line: 1, chord: "B7", position: 6 },
        { line: 1, chord: "G", position: 31 },
        { line: 2, chord: "Em", position: 15 },
        { line: 2, chord: "Bm", position: 31 },
        { line: 3, chord: "B7", position: 11 },
        { line: 3, chord: "C", position: 47 },
        { line: 6, chord: "C", position: 0 },
        { line: 6, chord: "Em", position: 17 },
        { line: 6, chord: "B7", position: 23 },
        { line: 7, chord: "C", position: 0 },
        { line: 7, chord: "Em", position: 17 },
        { line: 8, chord: "D", position: 11 },
        { line: 8, chord: "D7", position: 21 },
        { line: 11, chord: "G", position: 3 },
        { line: 11, chord: "Em", position: 19 },
        { line: 12, chord: "A", position: 3 },
        { line: 12, chord: "B7", position: 11 },
        { line: 12, chord: "C", position: 23 },
        { line: 13, chord: "D", position: 17 },
        { line: 14, chord: "B7", position: 26 },
        { line: 14, chord: "C", position: 51 },
        { line: 15, chord: "D", position: 28 },
        { line: 16, chord: "B7", position: 0 },
        { line: 16, chord: "C", position: 40 },
        { line: 17, chord: "D", position: 12 },
        { line: 18, chord: "B7", position: 22 },
        { line: 18, chord: "C", position: 55 },
        { line: 21, chord: "G", position: 0 },
        { line: 21, chord: "Em", position: 22 },
        { line: 21, chord: "Bm", position: 29 },
        { line: 21, chord: "B7", position: 37 },
        { line: 23, chord: "G", position: 0 },
        { line: 23, chord: "Em", position: 22 },
        { line: 23, chord: "Bm", position: 29 },
        { line: 23, chord: "B7", position: 37 },
        { line: 24, chord: "C", position: 0 },
        { line: 24, chord: "Em", position: 17 },
        { line: 24, chord: "B7", position: 23 },
        { line: 25, chord: "C", position: 0 },
        { line: 25, chord: "Em", position: 17 },
        { line: 26, chord: "D", position: 11 },
        { line: 26, chord: "D7", position: 21 }
      ]
    },
    {
      title: "Quillayes de Tomé",
      year: "2024",
      location: "Quillayes de Tomé",
      lyrics: `Una vez perdí mi corazón
Palpitando en el fuego
Que resguarda a los viajeros.

Tuve tanto frío de un amor.
En vano lo busqué en los libros viejos,
En las calles negras.

Traigo de equipaje un poema,
Una vieja carta que me indica
Dónde ir.

Dejo huella más allá
Dónde nadie nunca ha ido.
Junto a mi Patrulla iré
Hacia un pueblo escondido
En la cima
Donde duermen los que luchan
Cada instante por un sueño.


Una vez cambié el ruido de las calles
Por el crépito del fuego
Que acompaña el canto de mis compañeros.

Un día dejé atrás mi casa
Solo para ver de nuevo
Las constelaciones reflejadas en tus ojos negros.


Voy detrás de un sueño, una promesa,
El canto de un chucao que me indica
Dónde ir


Dejo huella más allá…`,
      chords: true,
      composers: "Marcelo Garcés",
      chordData: [
        { line: 0, chord: "Em", position: 0 },
        { line: 0, chord: "C", position: 32 },
        { line: 1, chord: "D7", position: 0 },
        { line: 2, chord: "G", position: 0 },
        { line: 2, chord: "B7", position: 34 },
        { line: 4, chord: "Em", position: 0 },
        { line: 4, chord: "C", position: 35 },
        { line: 5, chord: "D7", position: 0 },
        { line: 6, chord: "G", position: 0 },
        { line: 6, chord: "B7", position: 34 },
        { line: 8, chord: "Am", position: 0 },
        { line: 8, chord: "F", position: 26 },
        { line: 9, chord: "Am", position: 0 },
        { line: 9, chord: "F", position: 37 },
        { line: 10, chord: "G", position: 10 },
        { line: 10, chord: "G7", position: 16 },
        { line: 12, chord: "C", position: 0 },
        { line: 12, chord: "Bdim7", position: 16 },
        { line: 13, chord: "Dm", position: 0 },
        { line: 13, chord: "E7", position: 14 },
        { line: 13, chord: "Am", position: 30 },
        { line: 13, chord: "Am/G", position: 35 },
        { line: 14, chord: "F", position: 0 },
        { line: 14, chord: "Fm", position: 16 },
        { line: 15, chord: "Dm", position: 0 },
        { line: 15, chord: "E7", position: 20 },
        { line: 15, chord: "Am", position: 30 },
        { line: 16, chord: "Am/G", position: 0 },
        { line: 17, chord: "F", position: 15 },
        { line: 18, chord: "G", position: 30 },
        { line: 18, chord: "G7", position: 43 },
        { line: 22, chord: "Em", position: 0 },
        { line: 22, chord: "C", position: 43 },
        { line: 23, chord: "D7", position: 0 },
        { line: 24, chord: "G", position: 0 },
        { line: 24, chord: "B7", position: 38 },
        { line: 26, chord: "Em", position: 0 },
        { line: 27, chord: "C", position: 0 },
        { line: 28, chord: "D7", position: 0 },
        { line: 29, chord: "G", position: 0 },
        { line: 29, chord: "B7", position: 35 },
        { line: 32, chord: "Am", position: 0 },
        { line: 32, chord: "F", position: 32 },
        { line: 33, chord: "Am", position: 4 },
        { line: 33, chord: "F", position: 43 },
        { line: 34, chord: "G", position: 10 },
        { line: 34, chord: "G7", position: 16 }
      ]
    },
    {
      title: "Chonchi, Chiloé",
      year: "2025",
      location: "Chonchi, Chiloé",
      lyrics: `Dejo tierra firme,
Suelto amarras, 
Rumbo a la inmensidad,
Sin miedo al porvenir.

Y me embarco, voy cantando,
Cara al viento, 
A la isla de los brujos,
De historias de madrugada.

Al arribar
El recuerdo de mi mamá. 
Ojalá algún día
Sepa por qué vine acá.

Por qué el cansancio,
El hambre y el frío 
Me hacen trascender.
Al andar
Me basta mi guitarra 
Para así viajar ligero
Y así llegar más lejos.

Al cantar,
Canto con el corazón, 
Si no, mejor no canto,
Si igual vengo de lejos.

Y me interno en los bosques,
Voy buscando,
La verdad que el tiempo da
Los robles me la dirán

Y recorro los caminos,
Voy camino
A las aguas del Huillinco
El alma me entibiarán

En la noche estrellada
Me recuesto a cantar.
Y confío en la luna
Y su fulgor al caminar.

Porque ella  acompaña,
Conforta y ampara
Todo mi cantar

Al andar…

Y escondido en la tierra
Un tesoro
Que el tiempo guardará,
Un trozo de juventud.

Y al partir, el Tricahue
Reconquista
Nuestros sitios olvidados,
Sin rastros de la ciudad.

Te corté unas flores
Por si extrañaras mi voz.
Y si vuelvo y me ves
Un poco más viejo que ayer

No sientas pena
Recuerdos y amigos
Traigo por montón

Al andar… (bis)`,
      chords: true,
      composers: "Marcelo Garcés",
      youtubeLink: "https://www.youtube.com/watch?v=tVV0jpRoJaQ",
      chordData: [
        { line: 0, chord: "D", position: 5 },
        { line: 0, chord: "C", position: 27 },
        { line: 1, chord: "G", position: 0 },
        { line: 1, chord: "D", position: 17 },
        { line: 2, chord: "F", position: 9 },
        { line: 2, chord: "G", position: 21 },
        { line: 2, chord: "D", position: 25 },
        { line: 3, chord: "F", position: 5 },
        { line: 3, chord: "G", position: 14 },
        { line: 3, chord: "D", position: 24 },
        { line: 3, chord: "F", position: 28 },
        { line: 3, chord: "G", position: 32 },
        { line: 5, chord: "D", position: 5 },
        { line: 5, chord: "C", position: 27 },
        { line: 6, chord: "G", position: 0 },
        { line: 6, chord: "D", position: 17 },
        { line: 7, chord: "F", position: 9 },
        { line: 7, chord: "G", position: 21 },
        { line: 7, chord: "D", position: 25 },
        { line: 8, chord: "F", position: 5 },
        { line: 8, chord: "G", position: 14 },
        { line: 8, chord: "D", position: 24 },
        { line: 8, chord: "F", position: 28 },
        { line: 8, chord: "G", position: 32 },
        { line: 10, chord: "D", position: 5 },
        { line: 10, chord: "C", position: 27 },
        { line: 11, chord: "G", position: 0 },
        { line: 11, chord: "D", position: 17 },
        { line: 12, chord: "F", position: 9 },
        { line: 12, chord: "G", position: 21 },
        { line: 12, chord: "D", position: 25 },
        { line: 13, chord: "F", position: 5 },
        { line: 13, chord: "G", position: 14 },
        { line: 13, chord: "D", position: 24 },
        { line: 13, chord: "F", position: 28 },
        { line: 13, chord: "G", position: 32 },
        { line: 15, chord: "D", position: 2 },
        { line: 15, chord: "C", position: 27 },
        { line: 16, chord: "G", position: 0 },
        { line: 16, chord: "D", position: 17 },
        { line: 17, chord: "F", position: 9 },
        { line: 17, chord: "G", position: 21 },
        { line: 17, chord: "D", position: 25 },
        { line: 18, chord: "D", position: 2 },
        { line: 18, chord: "C", position: 27 },
        { line: 19, chord: "G", position: 0 },
        { line: 19, chord: "D", position: 17 },
        { line: 20, chord: "F", position: 9 },
        { line: 20, chord: "G", position: 21 },
        { line: 20, chord: "D", position: 25 },
        { line: 21, chord: "F", position: 5 },
        { line: 21, chord: "G", position: 14 },
        { line: 21, chord: "D", position: 24 },
        { line: 21, chord: "F", position: 28 },
        { line: 21, chord: "G", position: 32 },
        { line: 23, chord: "D", position: 2 },
        { line: 23, chord: "C", position: 27 },
        { line: 24, chord: "G", position: 0 },
        { line: 24, chord: "D", position: 17 },
        { line: 25, chord: "F", position: 9 },
        { line: 25, chord: "G", position: 21 },
        { line: 25, chord: "D", position: 25 },
        { line: 26, chord: "F", position: 5 },
        { line: 26, chord: "G", position: 14 },
        { line: 26, chord: "D", position: 24 },
        { line: 26, chord: "F", position: 28 },
        { line: 26, chord: "G", position: 32 },
        { line: 28, chord: "D", position: 0 },
        { line: 28, chord: "C", position: 27 },
        { line: 29, chord: "G", position: 0 },
        { line: 29, chord: "D", position: 17 },
        { line: 30, chord: "F", position: 9 },
        { line: 30, chord: "G", position: 21 },
        { line: 30, chord: "D", position: 25 },
        { line: 31, chord: "F", position: 5 },
        { line: 31, chord: "G", position: 14 },
        { line: 31, chord: "D", position: 24 },
        { line: 31, chord: "F", position: 28 },
        { line: 31, chord: "G", position: 32 },
        { line: 33, chord: "D", position: 0 },
        { line: 33, chord: "C", position: 27 },
        { line: 34, chord: "G", position: 0 },
        { line: 34, chord: "D", position: 17 },
        { line: 35, chord: "F", position: 9 },
        { line: 35, chord: "G", position: 21 },
        { line: 35, chord: "D", position: 25 },
        { line: 36, chord: "F", position: 5 },
        { line: 36, chord: "G", position: 14 },
        { line: 36, chord: "D", position: 24 },
        { line: 36, chord: "F", position: 28 },
        { line: 36, chord: "G", position: 32 },
        { line: 38, chord: "D", position: 0 },
        { line: 38, chord: "C", position: 27 },
        { line: 39, chord: "G", position: 0 },
        { line: 39, chord: "D", position: 17 },
        { line: 40, chord: "F", position: 9 },
        { line: 40, chord: "G", position: 21 },
        { line: 40, chord: "D", position: 25 },
        { line: 42, chord: "D", position: 0 },
        { line: 42, chord: "C", position: 27 },
        { line: 43, chord: "G", position: 0 },
        { line: 43, chord: "D", position: 17 },
        { line: 44, chord: "F", position: 9 },
        { line: 44, chord: "G", position: 21 },
        { line: 44, chord: "D", position: 25 },
        { line: 45, chord: "F", position: 5 },
        { line: 45, chord: "G", position: 14 },
        { line: 45, chord: "D", position: 24 },
        { line: 45, chord: "F", position: 28 },
        { line: 45, chord: "G", position: 32 },
        { line: 47, chord: "D", position: 0 },
        { line: 47, chord: "C", position: 27 },
        { line: 48, chord: "G", position: 0 },
        { line: 48, chord: "D", position: 17 },
        { line: 49, chord: "F", position: 9 },
        { line: 49, chord: "G", position: 21 },
        { line: 49, chord: "D", position: 25 },
        { line: 50, chord: "F", position: 5 },
        { line: 50, chord: "G", position: 14 },
        { line: 50, chord: "D", position: 24 },
        { line: 50, chord: "F", position: 28 },
        { line: 50, chord: "G", position: 32 },
        { line: 52, chord: "D", position: 0 },
        { line: 52, chord: "C", position: 27 },
        { line: 53, chord: "G", position: 0 },
        { line: 53, chord: "D", position: 17 },
        { line: 54, chord: "F", position: 9 },
        { line: 54, chord: "G", position: 21 },
        { line: 54, chord: "D", position: 25 },
        { line: 55, chord: "F", position: 5 },
        { line: 55, chord: "G", position: 14 },
        { line: 55, chord: "D", position: 24 },
        { line: 55, chord: "F", position: 28 },
        { line: 55, chord: "G", position: 32 }
      ]
    }
  ];

  /**
   * Renders a song line with chords positioned correctly above the lyrics
   * @param {string} line - The line of lyrics
   * @param {ChordInfo[]} chordsForLine - Chord information for this line
   * @returns {string} HTML string with positioned chords and lyrics
   */
  function renderChordLine(line: string, chordsForLine: ChordInfo[]): string {
    if (!chordsForLine || chordsForLine.length === 0) {
      return line;
    }

    let result = '';
    let lastPosition = 0;

    // Sort chords by position for proper rendering
    chordsForLine.sort((a: ChordInfo, b: ChordInfo) => a.position - b.position);

    chordsForLine.forEach((chordInfo: ChordInfo) => {
      // Add text up to this chord
      result += line.substring(lastPosition, chordInfo.position);
      
      // Add positioned chord
      result += `<span class="chord" data-chord="${chordInfo.chord}">${chordInfo.chord}</span>`;
      
      lastPosition = chordInfo.position;
    });

    // Add remaining text after the last chord
    result += line.substring(lastPosition);
    
    return result;
  }
  
  let expandedSong: number | null = null;
  
  /**
   * Toggles the expanded state of a song
   * @param {number} index - The index of the song to toggle
   */
  function toggleSong(index: number) {
    expandedSong = expandedSong === index ? null : index;
  }
  
  /**
   * Get chord data for a specific line of lyrics
   * @param {ChordInfo[] | undefined} chordData - All chord data for the song
   * @param {number} lineNumber - The line number to get chords for
   * @returns {ChordInfo[]} Chords for the specified line
   */
  function getChordsForLine(chordData: ChordInfo[] | undefined, lineNumber: number): ChordInfo[] {
    return chordData?.filter(chord => chord.line === lineNumber) || [];
  }
</script>

<svelte:head>
  <title>Cancionero - Tropa San Luis</title>
  <meta name="description" content="Cancionero de la Tropa San Luis con las canciones de nuestros campamentos a través de los años desde 1998 hasta 2025." />
  <meta name="keywords" content="Tropa San Luis, cancionero, himnos scout, canciones scout, campamento, música scout" />
  <meta name="author" content="Tropa San Luis" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://tropasanluis.cl/himnos/" />
  <meta property="og:title" content="Cancionero - Tropa San Luis" />
  <meta property="og:description" content="Colección de himnos y canciones de los campamentos de la Tropa San Luis desde 1998. Descubre las melodías que han acompañado nuestras aventuras." />
  <meta property="og:image" content="https://tropasanluis.cl/images/og-cancionero.jpg" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="https://tropasanluis.cl/himnos/" />
  <meta name="twitter:title" content="Cancionero - Tropa San Luis" />
  <meta name="twitter:description" content="Colección de himnos y canciones de los campamentos de la Tropa San Luis desde 1998. Descubre las melodías que han acompañado nuestras aventuras." />
  <meta name="twitter:image" content="https://tropasanluis.cl/images/og-cancionero.jpg" />
  
  <!-- Additional metadata -->
  <meta name="robots" content="index, follow" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="canonical" href="https://tropasanluis.cl/himnos/" />
  
  <style>
    .chord-line {
      position: relative;
      white-space: pre;
      height: 2em;
      margin-bottom: 0.5em;
      line-height: 1.2;
    }
    
    .chord {
      position: absolute;
      top: -1.2em;
      display: inline-block;
      color: #dc2626;
      font-weight: bold;
      font-size: 0.85em;
    }
  </style>
</svelte:head>

<div class="max-w-4xl mx-auto pb-8">
  <!-- Encabezado -->
  <div class="mb-12 text-center">
    <h1 class="text-5xl font-bold mb-6 text-center relative inline-block bg-gradient-to-r from-red-800 to-orange-600 bg-clip-text text-transparent">
      Himnos y Cancionero
      <div class="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-red-800 via-orange-600 to-red-800 rounded-full"></div>
    </h1>
    <p class="text-lg text-gray-700 mt-6">
      Melodías que han acompañado nuestras aventuras desde 1998.
    </p>
  </div>

  <!-- Lista de canciones -->
  <div class="space-y-6">
    {#each songs as song, index}
      <div class="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out">
        <!-- Cabecera de la canción (siempre visible) -->
        <button 
          class="p-4 w-full text-left bg-gradient-to-r from-red-600 to-red-700 text-white flex justify-between items-center cursor-pointer hover:bg-gradient-to-r hover:from-red-700 hover:to-red-800 transition-colors"
          on:click={() => toggleSong(index)}
          aria-expanded={expandedSong === index}
          aria-controls="song-content-{index}"
        >
          <div>
            <h2 class="text-xl font-bold">{song.title} ({song.year})</h2>
          </div>
          <div class="text-xl">
            {expandedSong === index ? '−' : '+'}
          </div>
        </button>
        
        <!-- Contenido de la canción (visible solo cuando está expandida) -->
        {#if expandedSong === index}
          <div id="song-content-{index}" class="p-5 font-mono text-gray-800 transition-all duration-500 ease-in-out">
            <!-- Display composers if available -->
            {#if song.composers}
              <div class="text-sm text-gray-600 mb-3 italic">
                Escrito por: {song.composers}
              </div>
            {/if}

            <!-- Display YouTube and Spotify links if available -->
            {#if song.youtubeLink || song.spotifyLink || song.spotifyEmbed}
              <div class="mb-4 flex flex-wrap gap-2">
                {#if song.youtubeLink}
                  <a href={song.youtubeLink} target="_blank" rel="noopener noreferrer" 
                    class="inline-flex items-center px-2 py-1 mb-2 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                    <svg class="w-4 h-4 mr-1 text-red-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    Escuchar
                  </a>
                {/if}
                {#if song.spotifyLink && !song.spotifyEmbed}
                  <a href={song.spotifyLink} target="_blank" rel="noopener noreferrer"
                    class="inline-flex items-center px-2 py-1 mb-2 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                    <svg class="w-4 h-4 mr-1 text-green-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                    Escuchar
                  </a>
                {/if}
              </div>
              {#if song.spotifyEmbed}
                <div class="mb-4">
                  {@html song.spotifyEmbed}
                </div>
              {/if}
            {/if}
            
            <br>
            
            
            {#if song.chords}
              {#each song.lyrics.split('\n') as line, lineIndex}
                <div class="chord-line">
                  {@html renderChordLine(line, getChordsForLine(song.chordData, lineIndex))}
                </div>
              {/each}
            {:else}
              <pre class="whitespace-pre-wrap">{song.lyrics}</pre>
            {/if}
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>
    