import axios from "axios";

class LifxService {

    public static getLights = async (setLightStatus: (arg0: any) => void, lightID:string = '' ) => {
        (await this.axiosCaller(lightID ? `https://api.lifx.com/v1/lights/id%${lightID}`: 'https://api.lifx.com/v1/lights', "GET")
          .then(function (response) {
            console.log(response.data);
            setLightStatus(response.data[0].power);
          })
          .catch(function (error) {
            console.error(error);
          }));
    
      };


    public static toggleLight = async (setLightStatus: (arg0: any) => void, lightID:string ) => {
        (await this.axiosCaller(`https://api.lifx.com/v1/lights/id%${lightID}/toggle`, "post")
          .then(function (response) {
            console.log(response.data);
            setLightStatus(response.data.results[0].power);
          })
          .catch(function (error) {
            console.error(error);
          }));
    
      };

      static axiosCaller = (url: string, method: string) => {
        return axios
        .request({
          method: method.toUpperCase(),
          url: url,
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            Authorization:
              "Bearer c3e80b048bc86f0281665e3be8995ae2788eabb6ddc0b0b2cb57259a0c1172f7",
          },
          data: { duration: 1 },
        })
      }
    }

export default LifxService