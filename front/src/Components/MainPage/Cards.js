import React, { useState } from "react";
import { Icon } from "@iconify/react";
import "../../SCSS/MainPage/Cards.scss";
import { useHistory } from "react-router";
import axios from "axios";

export default function Cards(props) {
  const history = useHistory();
  const [resized, setResized] = useState();
  // const defaultThumbnail =
  // "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFRgVFRUYGBgaGBoYGBgcGhocGBoYGBgZGhoYGhgcIS4lHB4rHxgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISHzQrISs0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIALcBEwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAACAwABBAUGB//EAD0QAAEDAQUECAMIAQMFAAAAAAEAAhEDBBIhMVFBYXGRE1KBobHB0fAFIjIGFEKCkqLh8WJyssIVFkNT0v/EABoBAAMBAQEBAAAAAAAAAAAAAAABAgMEBQb/xAAlEQACAgEEAgICAwAAAAAAAAAAAQIREgMhMVETQWGRBFIUYoH/2gAMAwEAAhEDEQA/ANHw+2gYOmNhXorLdcAV5Wz2U5hd2wMLYIXJqVdxZ26aljUkdV7NJhWaWErRZnyEys4AQMz7KWnKWSSFqqOLs591SEZCkLvOCgIUhHCkIHQEKoTIUhAULuqXUyFV1AUKIUupt1QtQJoQWqi1OuqXUWS0ILUJatBahLVVkNCC1AWrQWoS1OzNozliEsWksQlidkuJmLEJYtJYgLE7IcTMWKixaHtS3tOxOzNwFhqsNSmseTuWgMKdicKFkKFPFNItNGRnCVjjAzV7U0YDFc6rVlaXUAqdZsMkuTeKUdkc5xJVNouK61ksc4ldFlkGiadESWRwB8POii9Q2gNFEZEeNFWazQt4s42IWMTAvO/jq7s91/kfAVJ91aTVBGIWYIw1VHSS3ZMtVv0AQnNpIbqIErV36MlXtCy1S6mQruqrJoXdUupl1XdRYUKuqrqddUuosKE3VRanXVA3YiwoRdUupxbGfJATtUqabob03VioVFqJxOiINWiZi0KLUJanXVRanZLQgtQlqeWqFqLJaMxaqLVoLUN1VZDQgsQlieWqixFixM91WGJ11UGp2LEANS6jCVpuq4RYYnOFk3JzbMFrhXdRY6EsogIw1MDUV1KwxFwomQoiwxH3ENWj8q0BiVaHxnkuWUmlZ6cIpujJQlpzW9lQO2LPTpzktTKOohYKVuzaUVVAsqQcASU0NByzTWUwArDVonJu0ZPFKhNxWGJpCgatrMqADVCxNDVd1ACbqro1pDFV1KwoyligYtIYluYjK0OqM9U9soQ1Oc1VCIxSCU2+BRaluaeC0EISFoYiWtO1WWpkKiEyWKLVRamwquosmhV1CWpxaqLUWKhN1VdTrqG6nYUKLVV1OuoYRYqAuq7qKFcIsKBuqXUcKjgiwxKhSEt9cBAyuTsSTsbg1yPhRS/wUTFR0LqRXoEppwyTGDVcjbezPQVLdGez0CM1sDVQRKVCKd2NzbJCF7oxKNU+mHYFVmlsiat7ifvA3p7QgbZQmspwhSlfASUfRYCsNULSiaVeRFFQrupgaoWpisS5qU8LQ5Yq5LnYKZSouMbI5CrqPVNcSBKcdS3QpQpWCShdKYk1qt05TrqtLM8S271agIcAQihOyaFwqhGQhKLDEGFIVlVKLFiUQqIVyqJTsWJRCFBVq3dhWZ1pOwSiwxNT3AYlKFqZqsloe4tgiFjZTJOfqhCa+DutcFHQRCyWanGZK0OahiSZX3duiI0wMgqYSiD0Ddi7+5RNvKkWLEx/Dvj7KhYGz8zSTMYQQIPae5dt1UAScF8ipfH3Bgp3WBsYm6bxdH1GMDsxXas321c26C1hgf5Ag8T5Ljxkjuziz3jK7XMFSboIBxiRuw34KU6+hmV8/wDiH2tNVlwQzUAy5xgzjGHvsfYvtW9jCMHkyWkuBjIxuETgpakWnHiz6Gx5OxOaV4z4H9rQ/wCWoQDJgk8IHivUstaSv2DivRtBRtWVtoCa2uFakzNxZoCu6lNqhNa6VpGUZbGbTRaiii2JBe1IeyMgnuKRUeubUlGzSCZhtIjGVkNojJa7QAVzatJRGR042hrbZswGp3LLXru2HM4FLexJcwzifRbxkjCWmdWxhzR80RnO5am1mnIhcajVeMA7vw5KOLjiXKsiMGbn21knGME2m8EAglc4awOz+k8WgxHmhsWIFrtN0wFPvLiDAIOzJA4ScbvLHmntcNyeSFiyqT3x6o75/Ebqov3pQAmfJGVjwNFR8DNYKlpOOS0ueIyCU5jdEJicRAvuyTqNkIg5FE0NGwJgqKsn6JxXsaymRmUd3es/SKdINUrY6Q8t3ogBqs/S71OkCNwpGmBqos3ShRFMNjgu+z7My1oO5oPiEr/t1nVH6Wr0dwj8X7ZVmkde5YPY6efR5132cZoO1jSFQ+zrP8I/0N8V6MMPVVdCdFFsqkcFvwBm0A9gHktFm+G9H9D3s3XxH6SCO5dgUY2eCI027wmkBmpPqDN97iGjwAWpld+7khFMTInko0OnbGuAV4olyZpZaXahaadrOoXOc+DjMdqJloadpG8+JnLthLFc0K75Ou20ncqdaislF7dcNZnwVVK7ZgFx2fS7vMQlcgxiHUtTtfBYatsdr4KVqsbfXwWSq9zgYGeWBw7ISUV0VxwSra369wWOpaX9buCKo92UTt2DsjPuCyVXRmQCcxhPfC0jGPRnOUktmR1pf1j+kJRtL+s4flHoqqWhgEnIDE/SO8pXTtzGUbIPfJXQox6OKWrLse20P6zuTfRTp39Z36Weiz33DY4zpdPLFG2qcBDiMdg8ZVYroyerLi2NFpf1ncm+ir7xU6zv0t9El1oh0m9xwjkPeacas4gHuxEJ4ronySftkdaHj8Z5NjwV9O/rnk30SQ7WQc4djt0BjvUbamxi6d8R596eK6I8kvbf2aOlqR9Xc30QitU6x/b6YrO22sMi+Lw4jkCBeHBWLc0G6XtB1MNB4SSniuhPUf7P7HmtU6x/b6IXV6mp5N9EItQJgEHDZB7ZByzQGu8mLpG2YnuB4JqK6Ic5fs/sI1a2x0flB8FGVa3X5Nag+8HDOMpjy2In2qN2hI8k6+ETk/2f2MNd4/H+1qn3p/Wcfys7sEkWsyMzGZhzRjuIQN+IHaBgc57cCjH4DyV7f2bW139Y8LrFfTP6zv0s9Fiq2odeMMgW/wAE5oW2jaXvAnqs/wCLj3ox+Aet8v7Oh0r9T+lqiwfeAf8AyH9QVJ4/BPm/s/s9Q2oBnPcnsePcqOsh2O5j0hZ3seMhe4Ycw4rzmkz6GLZsDwiBWBvSE/Q7nTx/cmNe/ax3Np8ClS7KyN4AV3QsYqna136XHwCs2jUPH5XeiSiDZsDEeAzXLfbWN3HfgMNl44Tihb8QcfpaD+ceUq1ptkOaOm66erxR06YzmeXkueLW+MWAHaJkeErTRrHMmN0Ad5CTg6BSR0WU/efmgewA7AqZaB7hVUtDdkc5PcpxdCvcS9unistSlrM8U2papBk3e7/cAs33tkH5hliczETPyowkWpRXJmtFAYyTGmHfCzmzs08U99W8JyGpkSOSzl4ABloGp9VpGEkZynF7CH2VmJugbZgTI35pQotB29x8cVqDxsM6REdxVN4dsQFqm0YShFmYWQzIa3jOPgidQJwdGOYuvPmt7FZZ7lPNkPRRyX2PAC63A7tnEKOouAktaeU8zAC6Z4qyzaqzI8CPPVjBwbGsuJ/4uHgkPZVm8C2NgNyeZAK77qbTmBoiuD2FamjGX4zbuzzzaFQ4uewbiCeOOPclBubS5oJOTSHSN4ur1ApjYlPpTgSY3SPBNTM5fjHCY1reoRkdccsBgTiic2kBF1sYyYaByOfJdKv8OY/NuIyzmeKw2j4QCQYB3XsewkYhUpJmMtKUeEZXiz4EEHLJ3leRhtJ2AeWnQnTjMZKO+Du2OJGhL45SR3KP+CbTB4SP4V2uzJxl0SnRaJ+eTpeEjmR4LSywBxl11437OzKVjd8PfGBkdV8dxhZ3WV7TixzNCyQPPyS/0dVyjqvsAjBjSDvkTwPkgbYT/wCs9jv/AKhZmCqcqp4HDLQwtVOvXb9QcQdoc08rye/Yni3vFl/9O/w7/QKIvvFbrH9LFEWx46XT+j3JCAsR3lV5eUz6VFBiIMV31XSKR7l3VV1XfOnNA6uBt5JblAVw4RDL2oBE9+Cwl7AfmDmE7CLvfkea3dPOTSUbAeqArjLEmUbMVGozPZPXaf8AkVrZWH+J/M3ylaWN1jknsCT1PgnGjK1+H0ftnyCVWaBiQB+X+V02t0cRuzSql7ceY9VbkluStzj1XtP4+E3e7BJzEXsNfl9fJdGtUjNnbJI5AeSx9Mx0xcJGwET4Kk2+AaS5MtS6M3A8XeqqBH0g78+6CnPrEZMPZBPclOqHaI4q1LszcU+ATB2Y7sO6Qk1ZbnJwyA8z6o3Wpg/G0LNVax5ku4GZ7RGXFWtyWqCo2gn8BbhOMH/bKaasZkDSTErLRa0SGukbYa6SIgfNt5oblNgugOdJmM/E3R72p4om2badSRqPeqsv4juS2G7+GBs+ZxMf6QIU6YYuDSAPqMXQSjEWQwEaz3q53oKlXABuZgzm2BMiYjszTYMYYpUNsEgbkJYE67JyKB7d3gigM9SmNhI5pdw7CE95uZwApTh2IcDwMwnbRLimZxKcxnv+kYb2o7u5PJk+OIAAOwKFoKe1qFzQM0ZB40KdZmuzCJlnboAdyIbj75K8fcp5MjxovoRoOSiqfeCiLF40dKSq6SNqIsQhi4WeqixU0CY29wUYE0JAxZp6yVVwaJsoHFUkTZbUwJIcjDk6E2NamsKzByYxyloZrYUDyqa5C9ym/RKW4mqVirMBzAPELW9yyvKMdzVPY5lT4bTJJuQTnBI8Cn2SzAC5i5pBMOJdEDKTszTXlLdiIkjeMCtY5dmclHoXWsbR9LB2DDwVMs5/EO+QhPTD6XtI/wAm482keCbZbTUvQ9rQOs04doIkLfYw36EVWgGMOz+EtgaNgJ34wtlvs5JnGNsYZbwsooAbPPmShgkQubnfE81bKrIMOJ1EGOzDHsVikd3LwTmt94ITBxM1R7M4PGCBzMI6Dx9UEESIyxI25zgdi1hsjP1QupyIERtnJVZO5mfbIbPlGROPdKCnayRMtOmeWzEDyQPsJDrwJgYXR9MaXULKAAIaC0Rsu+H8Jpolpmvo5F6Z1iYB3f0ga1ox1yIIxWOt0oECCdkHdnjlzWymw4XjO4gEd6SG9uBjWTkT2yoG47OwpjaDmkuYQQfwkRHA+SY9k6XtsHHwRQrEtbqrFPRNc2BEntCATE4H3vSZSLjUKiTvI4eiaxpOqjqR0KAFflUTei3KIFRoKqVFCuZnagg5WHIArlKgYyULlQcqJVIhlyoChlWqJGApjHJAKMKGUh4cqc5La5RxU0UA9yzvKc8rO8poYDillE4pZPvBXEiRJUBQlyEuVkNBvtFQZFrho7A8x6JLrWRnR43XA+islDKakS4hst9P8THg8HHvEpn3yicZdyPokFSE8hYs1NttHXucVbLRRdk8DcTHisioNCMkGD7Nxpl2LC0jmkGyvmSXE6XQkCmJwwO7A9ya2q4ZPd4+KMkGLEvpYyG47xhC1NeDgWGNInuHkh+8v6wPEeiY20g/Uztb6FNSXYOLrgTVtb2n5WGAcccxw2LWys13zRlnIyV3mOEXhpj8rv5V0rOWmWmQcwdqN+UG3DGtLSJHcUroxmMd+1U+m2cLzTszz8CoGFpxE+Kdk4jGMAP1HthNfTkYFZ3VL2EOB3HFW1hGYJHJ38piaF3h7Kidfb1nclECDVKkQXMdhIUKhKpAElRSVRQIuVJVKpTEGCrDvYSryIH37zUsY6ffFATPv3KW93Dty7VJzJx4ZxvOwIGW/wB6DjySXez6IydYO7YPXilOd5Y7eG4IGA5Lce3giLve5LJTRLKP9+iHsRD+vVCSD58P7VWS0SPfmor99ioBOwoqFIVhXCVhRSke+CnorRYUUAoVahSbGkBKsFWQoGpFlhyJp0w4YIYRQhSYnFMeys4bZGhxWkPa7bdOh+lYQiBVKbIcEzU8PGBYY1BkeqaGGJGI0MlZadQjIkeHJamWs7QDwwK0U0zJwaF9OOr3KJ33lmncoqsnH4FAopUUXOdZUqpUUQIkqpUUQIElS+oomBAZyJVucookxkAJyjVAXzrs7/NRRT7GR7vY970t7t/AKKJoTENGfegBBx095KKJiLBVH+TwUUTEQ/0qJw7laiQy4yCpRRAFlWBiVFEAVs5K1FEAWpCiiRRYCKFFEDIGog1RRAi4RAqKJiZLyiiiAP/Z";

  const [imgIsLoaded, setImgIsLoaded] = useState(false);

  const isNew = (createdAt) => {
    let createdDay = new Date(createdAt);
    let today = new Date();
    const oneDay = 1000 * 60 * 60 * 24;
    let daysOver = (today - createdDay) / oneDay;

    if (daysOver <= 7) return 1;
    else return 0;
  };

  const resizedImage = async (key, size) => {
    // 정상적으로 가져와지면 resized url반환, 아니면 원본이미지 url반환
    const url = key.split("/");
    url[url.length - 3] = size;
    const resized = url.join("/");

    try {
      await axios({
        method: "head",
        url: `${resized}?timestamp=${Date.now()}`,
      });
      setResized(resized);
    } catch (err) {
      {
        console.log(err);
        setResized(key);
      }
    }
  };

  resizedImage(props.projectData.thumbnailImage, "500");

  return (
    <div
      className="cards"
      onClick={(e) => {
        e.preventDefault();
        history.push(`/project/${props.projectData.id}`);
      }}
      style={{ cursor: "pointer" }}>
      {isNew(props.projectData.createdAt) === 1 && (
        <div className="card__new-tag">NEW</div>
      )}
      <div
        className="card__image"
        style={{
          backgroundColor: imgIsLoaded ? "#808080" : "transparent",
        }}>
        {/* <img
          className="card_img__small"
          src={
            props.projectData.thumbnailImage
              ? resizedImage(props.projectData.thumbnailImage, "30")
              : defaultBlur
          }
          alt="card_image"
          style={{
            visibility: imgIsLoaded ? "hidden" : "visible",
          }}
          onLoadStart={() =>
            (document.querySelector(".card__image").style.backgroundColor =
              "#808080")
          }
        /> */}
        <img
          className="card_img__full"
          alt="card_image"
          src={resized}
          onLoad={() => {
            setImgIsLoaded(true);
          }}
          style={{ opacity: imgIsLoaded ? 1 : 0 }}
        />
        <div className="image__title">{props.projectData.title}</div>
      </div>
      <div className="card__info">
        <div className="info__left">
          <div className="info__interest">
            관심 <span className="interest__num">{props.projectData.like}</span>
          </div>
          <div className="info__chat">
            조회{" "}
            <span className="chat__num">{props.projectData.viewCount}</span>
          </div>
          <div className="info__comment">
            댓글{" "}
            <span className="comment__num">
              {props.projectData.commentCount}
            </span>
          </div>
        </div>
        <div className="info__right">
          <div className="info__member">
            <Icon className="member__icon" icon="bi:person-fill" />
            <span className="memer__num">
              {props.projectData.currentMember} /{" "}
              {props.projectData.totalMember}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
