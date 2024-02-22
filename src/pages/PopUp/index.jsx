import React, { useEffect, useRef, useState } from "react";
import "./PopUp.scss";
import Content from "./Content";

const PopUp = () => {
  const [popup, setPopup] = useState(false);
  const btnRef = useRef(null);

  //
  //   const btnRef = useRef(null);
  const [scrollingDivOffsetTop, setScrollingDivOffsetTop] = useState(0);
  const [position, setPosition] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (btnRef.current) {
        const { top } = btnRef.current.getBoundingClientRect();
        setScrollingDivOffsetTop(top);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  //

  const handleMouseEnter = () => {
    setPopup(true);
  };
  const handleMouseLeave = () => {
    setPopup(false);
  };

  useEffect(() => {
    console.log("calc",window.innerHeight - scrollingDivOffsetTop,window.innerHeight - scrollingDivOffsetTop > 200);
    setPosition(window.innerHeight - scrollingDivOffsetTop > 230);
  }, [scrollingDivOffsetTop]);

  //   let top = btnRef.current?.getBoundingClientRect();
  //   console.log(window.innerWidth, window.innerHeight, top);
  console.log("ans", scrollingDivOffsetTop, window.innerHeight);
  return (
    <div className="PopUp">
      <div className="container">
        <div className="top-div"></div>
        <div className="hover-container">
          <p
            className="hover-content"
            onMouseEnter={handleMouseEnter}
            ref={btnRef}
            onMouseLeave={handleMouseLeave}
          >
            Hover Me
          </p>

          {popup && <Content className={`popup-content ${position ? "lower" : "upper"}`} />}
        </div>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos beatae
          pariatur odit dolore non consequuntur dolores rem ipsa. Ipsam
          voluptatem repellat obcaecati pariatur quibusdam voluptate, ipsa
          perspiciatis, incidunt, necessitatibus aliquam ad quisquam aspernatur.
          Veniam consequatur quasi officia facilis quisquam minima, adipisci
          dignissimos ullam, animi rerum quaerat molestiae aut ratione omnis hic
          reprehenderit esse dolorem vitae impedit dolor? Inventore, molestias.
          Praesentium eligendi labore excepturi deleniti odio provident id iure
          eum inventore possimus a, est fugit, voluptate, earum ullam aspernatur
          tempore natus architecto! Ex, quo autem esse eius deserunt totam
          aliquam? Error totam qui soluta asperiores expedita quae molestias
          repudiandae, odit exercitationem. ossimus. Magnam, aliquam quod
          placeat temporibus labore aliquid iure incidunt? Magni, at sunt
          debitis veritatis nemo ullam neque ipsam rem voluptate, laboriosam
          perferendis ipsum, quod accusantium doloremque fugiat delectus eum
          cumque facere quia? Tenetur labore, reprehenderit deserunt corrupti
          laudantium dolorem, ut culpa libero, minus velit reiciendis eveniet
          similique nulla eaque deleniti. Obcaecati quidem, provident odit,
          aspernatur hic deserunt quos, debitis iusto magni reiciendis
          perspiciatis numquam voluptatum nobis architecto laborum? Commodi
          tenetur laboriosam quam? Esse non facilis tempore expedita incidunt
          praesentium veniam quas sint quis dolores dolorem qui nisi
          necessitatibus, repudiandae nobis deserunt cum, doloremque, vitae
          provident. Labore cumque ratione commodi fuga dolorem hic quaerat
          explicabo itaque, eveniet ea doloremque quae dolor dignissimos
          praesentium dicta quis recusandae saepe minus porro possimus!
          Architecto accusamus quia tenetur repellendus obcaecati dolorem nobis
          eveniet sunt! Nam unde esse reiciendis magni, rem hic laborum
          laudantium neque sequi explicabo modi repellendus voluptatem. Expedita
          incidunt odio laudantium minus rerum voluptatem accusantium ea tempore
          nisi veritatis consectetur, reprehenderit aliquam animi distinctio
          provident tenetur similique explicabo, eaque vel neque, ab quam
          obcaecati modi suscipit! Maxime sed culpa optio consectetur! Doloribus
          corrupti tempore itaque maxime, repellendus tempora animi quidem
          excepturi eos. Ex ab temporibus expedita unde! Suscipit cumque fuga
          nihil labore doloremque ex sapiente libero laudantium, in repudiandae?
          Ipsa iure deleniti veritatis quidem repellendus, nulla rerum deserunt
          mollitia enim illum minima laudantium. Itaque aspernatur reprehenderit
          voluptatum iste ipsum eligendi nam in. Quaerat vitae corporis corrupti
          veniam inventore id natus, accusamus, omnis praesentium eligendi
          exercitationem odit minima cupiditate temporibus consectetur nesciunt
          dolor aperiam necessitatibus maiores illum tempore laudantium eius
          consequuntur? Odit cum adipisci consequuntur molestiae, impedit
          veritatis iste commodi voluptatibus recusandae saepe quos animi
          perspiciatis tenetur, dolore quidem voluptas cupiditate eveniet dolor
          suscipit odio tempora reiciendis. Ullam quia illum maiores explicabo
          non nostrum sapiente laboriosam vitae sit cum eaque perspiciatis odio
          ad quo, magni nobis a dolor incidunt numquam hic laudantium. Quos fuga
          et, repudiandae vero adipisci ipsum doloremque tempora nobis
          laboriosam. Consectetur autem et, recusandae adipisci ut quod,
          molestiae sunt suscipit ex consequuntur ducimus aut sed inventore
          harum tempora magni cupiditate laboriosam odio delectus? Perspiciatis
          ea ducimus nisi architecto omnis laborum ullam quos quasi!
          Perspiciatis eum magnam doloremque nulla libero error quis quo id
          optio minus minima, assumenda temporibus unde dolorum nisi cumque eos
          odit, illo quam sit! Consectetur consequatur debitis quod quam.
          Officiis hic accusamus minima praesentium quibusdam, excepturi vero
          esse! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos
          nobis delectus, incidunt veniam itaque illum eligendi autem quod
          deserunt placeat iusto fugit repellendus sequi architecto, aliquid
          ullam? Nesciunt, perspiciatis nulla. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Omnis, culpa officia commodi quibusdam
          molestiae ullam quos nulla quasi atque quo quas? Temporibus,
          reprehenderit! Quos accusantium quisquam, dignissimos, iste amet ut
          quaerat nobis hic cumque maiores, voluptate incidunt temporibus esse
          sapiente fugit. Animi pariatur sapiente inventore ad quaerat ea
          assumenda consequatur odit asperiores, necessitatibus, repellat
          deserunt? Quo, minima dolore praesentium sint atque a corporis, sed
          officiis quasi cumque veniam eum. Fugiat dicta ex doloribus corporis,
          illo sint quas repellat autem. Officiis, tenetur perspiciatis id ad
          consequuntur asperiores magnam similique optio excepturi corporis
          sapiente fugit eligendi incidunt! Numquam enim animi aperiam
          consequatur culpa, ipsam corporis dicta iusto beatae, vel rem officia
          error voluptas fuga? Praesentium tempora qui cumque nobis voluptate
          accusamus porro voluptatum, veritatis asperiores ab ipsum laudantium
          sit culpa voluptas quas, saepe maxime? Recusandae dolorum fuga rem
          quam culpa totam atque accusantium ea quod corrupti animi ab nisi vel
          hic, aperiam unde reprehenderit quos cumque ut sapiente consequuntur.
          Accusamus, quia suscipit consequuntur debitis enim itaque illo,
          excepturi nostrum repellat rerum perferendis, ipsum soluta veniam
          quibusdam repudiandae error fuga dolorem sed aspernatur ad. Fugit hic
          iusto, reprehenderit excepturi possimus eum labore accusamus vel!
          Deleniti quidem et inventore quae cumque nisi consequuntur velit,
          aliquid sit. Mollitia ratione eaque odit consequatur voluptate alias
          inventore id. Architecto perferendis ullam similique consequuntur
          provident, facere vel harum, tenetur nihil nostrum animi assumenda
          quae. Similique sed nam iste rerum? Quidem illo vel corporis, non
          quibusdam quas iure quod reprehenderit delectus minima tenetur?
          Maiores nesciunt placeat inventore, eos ea dolor fuga molestias,
          necessitatibus itaque ex eius nostrum quaerat incidunt? Eaque, cumque
          ipsa. Minima, placeat perspiciatis tenetur, voluptas tempora ea
          aliquam reprehenderit ad quas amet nulla quasi accusantium ipsam
          sapiente expedita sint aspernatur consectetur. Necessitatibus quas
          praesentium ducimus blanditiis, amet mollitia! Sit neque ipsum
          voluptatum, nihil eaque placeat maiores, dolor adipisci nobis,
          possimus delectus molestiae praesentium iusto? Vitae accusamus
          necessitatibus facere, sed expedita est repellat optio dolores
          corporis quae reiciendis cum ullam? Nesciunt ipsum sint in doloremque?
          Perspiciatis dolor, eius, cumque laboriosam ea quod qui nesciunt
          assumenda, earum cum repudiandae. Ducimus iure, voluptas maxime
          assumenda facilis commodi saepe quos consectetur tempore rerum atque
          eius laudantium deserunt voluptate, aut dolores qui quasi beatae
          provident excepturi cupiditate eaque iusto incidunt. Itaque quam
          libero commodi dicta expedita, blanditiis dolorem vel officia suscipit
          omnis quasi adipisci, excepturi dignissimos nesciunt reiciendis aut
          aliquam unde molestias odio! Cupiditate illo vero dicta ad, quisquam
          rerum non natus fugit velit excepturi necessitatibus fugiat, omnis
          laudantium dolorem harum. Ratione deleniti iste neque earum fuga,
          eligendi quo repellat consectetur ad, doloremque eos ipsam officiis
          sed in quasi quam placeat, quos non quia. Natus minus provident
          voluptate eum tempora excepturi modi vero ipsa culpa? Aut aliquid,
          vitae non obcaecati voluptatibus reprehenderit a. Rem sapiente
          repellendus iste explicabo nisi. Esse minima doloribus dignissimos hic
          quo natus veniam nisi eveniet dolorem, modi saepe velit atque labore
          non ut consectetur nostrum, voluptatem distinctio numquam aut! Ab
          magni autem expedita, quam, cupiditate quis corrupti modi tenetur
          veniam tempore dignissimos nihil placeat eum cumque neque temporibus
          nesciunt reprehenderit! Nemo nostrum quae ea distinctio harum sunt
          aliquam esse quas rem, ipsa ducimus cumque iste maxime aliquid maiores
          assumenda quaerat dolore excepturi earum quod! Tempora iure repellat
          quis modi accusantium magni consequuntur quae qui, consequatur
          voluptatibus libero, non vitae velit ea fugiat! Voluptas alias quis
          eveniet, aliquid cumque quam officia nemo consequuntur praesentium
          minus sed reiciendis impedit molestiae, facere voluptatibus suscipit
          consectetur provident amet, dolor vel et unde dignissimos quidem
          maiores! Aperiam laudantium ullam ratione tempora at doloremque
          blanditiis ipsam provident iusto consequatur? Atque, error ex
          consequuntur illo, soluta provident nemo iste molestiae incidunt,
          numquam impedit sint maiores! Voluptatibus pariatur cumque ad vel
          veniam qui quasi debitis consectetur, expedita corrupti eligendi rem
          unde similique optio ratione architecto dolore nostrum alias hic,
          nihil laborum, totam voluptatem doloremque culpa. Adipisci harum culpa
          inventore sequi odio ipsam illo, eius et? Explicabo modi quos voluptas
          commodi voluptate ipsa natus quas quis maiores deleniti, repellat quia
          similique omnis est non iure tempora, esse fuga, ullam dolore
          obcaecati. Impedit temporibus dignissimos blanditiis maiores facilis
          eius accusantium, quasi minus ab exercitationem. Architecto ea
          possimus nesciunt eaque iste velit vel veniam sapiente exercitationem,
          commodi reprehenderit! Voluptatibus, est dolorem dolorum blanditiis
          nostrum amet. Repudiandae placeat fugit esse optio tempore eveniet
          quae, aperiam, sit voluptate a culpa neque corrupti aspernatur atque
          ipsa ex ab error nemo, consectetur totam nisi non. Consequatur, eius
          iure omnis magni vitae suscipit aliquid distinctio, officiis sequi
          voluptas perferendis quam. Temporibus quas iure tenetur impedit harum,
          soluta eveniet esse. Dicta possimus quam quas! Voluptatum doloremque,
          rem placeat porro qui officia maxime obcaecati nesciunt? Corporis
          praesentium minus quia exercitationem perspiciatis sunt iure officia
          temporibus. Aperiam, dicta hic, accusantium voluptatem, recusandae
          harum minus id eveniet aut molestiae ut? Fuga corporis, nesciunt sequi
          non quo excepturi repudiandae deserunt aspernatur? Aliquam laborum
          harum illo cupiditate repellendus, esse officia ea odio ratione
          reprehenderit voluptas! Modi eaque voluptatibus optio perferendis
          quidem reprehenderit cum, libero non, ratione necessitatibus autem
          ipsam velit incidunt commodi? Perspiciatis illum, dolorum harum
          consectetur ipsam voluptatem eum error quos repudiandae similique
          porro dolores aspernatur beatae voluptates. Quam ducimus quae
          laboriosam sed nihil officiis consequuntur eaque est, accusamus porro
          maxime dignissimos error debitis veniam unde quisquam harum, impedit
          hic eum reprehenderit molestiae aliquid. Minima suscipit qui eius
          provident cupiditate, corrupti magnam. Provident exercitationem cumque
          ex delectus fuga doloremque quo fugit natus quisquam distinctio
          voluptates ipsa hic voluptatibus, quos vero sapiente aut pariatur in
          assumenda dolores minus debitis? Accusantium aliquam repellendus
          blanditiis labore illum beatae voluptate necessitatibus molestias
          magnam commodi consequuntur est non libero pariatur, doloribus alias.
          Laborum animi saepe aperiam nobis placeat quibusdam dignissimos dolore
          molestiae aspernatur fugit? Ullam a necessitatibus nulla magnam vel
          soluta totam quis voluptatibus. Corporis dignissimos blanditiis nihil,
          aliquam quidem similique consequuntur qui vero eaque sunt dolores hic
          eius eum velit reprehenderit amet tempore quas. Veniam error a rerum
          dolorum enim distinctio! Veritatis autem tempora a asperiores
          distinctio? Consequatur, ut. Nesciunt laborum fuga et perferendis ad!
          Atque reprehenderit, blanditiis esse voluptatum eos totam dolore.
          Fugit veniam minima est perspiciatis ut quaerat molestiae accusantium
          voluptatum.
        </p>
      </div>
    </div>
  );
};

export default PopUp;
