import axios from "axios";

class LifxService {

    public static getLights = async (setLightStatus: (arg0: any) => void, setLightColor: (arg0: any) => void,lightID:string = '' ) => {
        (await this.axiosCaller(lightID ? `https://api.lifx.com/v1/lights/id%${lightID}`: 'https://api.lifx.com/v1/lights', "GET")
          .then(function (response) {
            console.log(response.data);
            setLightStatus(response.data[0].power);
            setLightColor(response.data[0].color)
            return response
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

      public static setLightState = async (setLightStatus: (arg0: any) => void, color:string) => {


        (await this.axiosCaller(`https://api.lifx.com/v1/lights/all/state`, "put", color ? {
            "power": "on",
            "color": `${color} saturation:1`
          }:{ "power": "off",
          "color": `hue:60 saturation:0 kelvin:2000`})
          .then(function (response) {
            console.log(response.data);
            setLightStatus(response.data.results[0].power);
          })
          .catch(function (error) {
            console.error(error);
          }));
    
      };

      

      static axiosCaller = (url: string, method: string, body?: any) => {
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
          data: body ?? { duration: 1 },
        })
      }

      public static colorParser = (color: any) =>
      {
        console.log("COLOR:", color)
        switch (JSON.stringify(color))
        {
          case JSON.stringify({hue: 60, saturation: 1, kelvin: 2000}):
            {return "Yellow"}

          case JSON.stringify({hue: 0, saturation: 1, kelvin: 2000}):
            {return "Red"}

          case JSON.stringify({hue: 120, saturation: 1, kelvin: 2000}):
            {return "Green"}
          default:
            return "Unknown"
        }
        

      }
    }

export default LifxService