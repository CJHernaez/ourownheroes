import axios from "axios";

class LifxService {

    public static toggleLight = (setLightStatus: (arg0: any) => void ) => {
        axios
          .request({
            method: "POST",
            url: `https://api.lifx.com/v1/lights/id%3Ad073d5656598/toggle`,
            headers: {
              accept: "application/json",
              "content-type": "application/json",
              Authorization:
                "Bearer c3e80b048bc86f0281665e3be8995ae2788eabb6ddc0b0b2cb57259a0c1172f7",
            },
            data: { duration: 1 },
          })
          .then(function (response) {
            console.log(response.data);
            setLightStatus(response.data.results[0].power);
          })
          .catch(function (error) {
            console.error(error);
          });
    
      };
    }

export default LifxService