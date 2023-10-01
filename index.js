const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const lightContract = '0x842668E2B9A73240aBF6532DEdC89c9c3e050C98'
const deadWallet = '0x0000000000000000000000000000000000000000'
const csupplykey = '7S8DAP7W64TPVJGHP95DRQMC8XIANFW53I'
const msupplykey = 'VCHI52WNUVKQ6CMZ1CTM8PRMXFKBUCTBU9'
const tsupplykey = 'I5TGHMZGKF5I4JJXQB83HUE6J32PM8NTQU'
const liquidityWallet = '0x842668E2B9A73240aBF6532DEdC89c9c3e050C98'

console.log(`Server stated!`)

app.get('/', async (req, res) => {
  res.send(`API Server`)
})

app.get('/api/v1', async (req, res) => {
  if (req.query.api == "csupply") {

    try {
      const response = await axios.get(
        `https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=${lightContract}&apikey=${csupplykey}`,
      )

      const dataSupply = response.data.result
      const totalSupply = parseInt(dataSupply)

      const reponse2 = await axios.get(
        `https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=${lightContract}&address=${deadWallet}&apikey=${csupplykey}`,
      )

      const totalDead = reponse2.data.result
      const totalDeadNumber = parseInt(totalDead)

      const reponse3 = await axios.get(
        `https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=${lightContract}&address=${liquidityWallet}&apikey=${csupplykey}`,
      )

      const totalLiquidity = reponse3.data.result
      const totalLiquiityNumber = parseInt(totalLiquidity)
      const currentSupply = (totalSupply - totalDeadNumber - totalLiquiityNumber) * 0.000000001

      if (currentSupply.toString() == "NaN") {
        return res.send("Unable to process request: Limit per second reached")
      } else {
        return res.send(String(currentSupply))
      }
    }
    catch (e) {
      return res.send("API Error: " + e)
    }

  } else if (req.query.api == "msupply") {

    try {
      const response = await axios.get(
        `https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=${lightContract}&apikey=${msupplykey}`,
      )

      const dataSupply = response.data.result
      const maxSupply = parseInt(dataSupply)
      const mxSupply = maxSupply * 0.000000001

      if (mxSupply.toString() == "NaN") {
        return res.send("Unable to process request: Limit per second reached")
      } else {
        return res.send(String(mxSupply))
      }
    }
    catch (e) {
      return res.send("API Error: " + e)
    }



  } else if (req.query.api == "tsupply") {


    try {
      const reponse3 = await axios.get(
        `https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=${lightContract}&address=${liquidityWallet}&apikey=${tsupplykey}`,
      )

      const response = await axios.get(
        `https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=${lightContract}&apikey=&{tsupplykey}`,
      )

      const reponse2 = await axios.get(
        `https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=${lightContract}&address=${deadWallet}&apikey=${tsupplykey}`,
      )

      const datatSupply = response.data.result
      const totalSupply = parseInt(datatSupply)

      const totalLiquidity = reponse3.data.result
      const totalLiquiityNumber = parseInt(totalLiquidity)

      const totalDead = reponse2.data.result
      const totalDeadNumber = parseInt(totalDead)

      const realtotalSupply = (totalSupply - totalDeadNumber - totalLiquiityNumber) * 0.000000001










      if (realtotalSupply.toString() == "NaN") {
        return res.send("Unable to process request: Limit per second reached")
      } else {
        return res.send(String(realtotalSupply))
      }
    }
    catch (e) {
      return res.send("API Error: " + e)
	  
		}
    } else if (req.query.api == "tburned") {

    try {
      const response = await axios.get(
        `https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=${lightContract}&apikey=${csupplykey}`,
      )

      const dataSupply = response.data.result
      const totalSupply = parseInt(dataSupply)

      const reponse2 = await axios.get(
        `https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=${lightContract}&address=${deadWallet}&apikey=${csupplykey}`,
      )

      const totalDead = reponse2.data.result
      const totalDeadNumber = parseInt(totalDead)

      const reponse3 = await axios.get(
        `https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=${lightContract}&address=${liquidityWallet}&apikey=${csupplykey}`,
      )

      const totalLiquidity = reponse3.data.result
      const totalLiquiityNumber = parseInt(totalLiquidity)
      const currentSupply = (totalSupply - totalDeadNumber - totalLiquiityNumber) * 0.000000001
	  const totalBurned = (totalDeadNumber + totalLiquiityNumber) * 0.000000001

      if (totalBurned.toString() == "NaN") {
        return res.send("Unable to process request: Limit per second reached")
      } else {
        return res.send(String(totalBurned))
      }
    }
    catch (e) {
      return res.send("API Error: " + e)
    }


  } else {
    return res.send("Error")
  }


})


app.listen(process.env.PORT || 3001)
