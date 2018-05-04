#!/bin/bash
# Copyright IBM Corp. All Rights Reserved.
#
# SPDX-License-Identifier: Apache-2.0
#

jq --version > /dev/null 2>&1
if [ $? -ne 0 ]; then
	echo "Please Install 'jq' https://stedolan.github.io/jq/ to execute this script"
	echo
	exit 1
fi
starttime=$(date +%s)

echo "POST request Enroll on Org1  ..."
echo
ORG1_TOKEN=$(curl -s -X POST \
  http://10.0.2.15:4040/users \
  -H "content-type: application/x-www-form-urlencoded" \
  -d 'username=Manufacturer&orgName=org1')
echo $ORG1_TOKEN
ORG1_TOKEN=$(echo $ORG1_TOKEN | jq ".token" | sed "s/\"//g")
echo
echo "ORG1 token is $ORG1_TOKEN"
echo
#-------------------------------------------------------------------
echo "POST request Enroll on Org2  ..."
echo
#------------------------------------------------------------------
ORG2_TOKEN=$(curl -s -X POST \
  http://10.0.2.15:4040/users \
  -H "content-type: application/x-www-form-urlencoded" \
  -d 'username=Distributor-1&orgName=org2')
echo $ORG2_TOKEN
ORG2_TOKEN=$(echo $ORG2_TOKEN | jq ".token" | sed "s/\"//g")
echo
echo "ORG1 token is $ORG2_TOKEN"
echo
echo "POST request Enroll on Org2  ..."
echo
#------------------------------------------------------------
ORG2_TOKEN=$(curl -s -X POST \
  http://10.0.2.15:4040/users \
  -H "content-type: application/x-www-form-urlencoded" \
  -d 'username=Distributor-2&orgName=org2')
echo $ORG2_TOKEN
ORG2_TOKEN=$(echo $ORG2_TOKEN | jq ".token" | sed "s/\"//g")
echo
echo "ORG1 token is $ORG2_TOKEN"
echo
echo "POST request Enroll on Org2  ..."
echo
#--------------------------------------------------------------
ORG2_TOKEN=$(curl -s -X POST \
  http://10.0.2.15:4040/users \
  -H "content-type: application/x-www-form-urlencoded" \
  -d 'username=Distributor-3&orgName=org2')
echo $ORG2_TOKEN
ORG2_TOKEN=$(echo $ORG2_TOKEN | jq ".token" | sed "s/\"//g")
echo
echo "ORG1 token is $ORG2_TOKEN"
echo
#-------------------------------------------------------------------
echo "POST request Enroll on Org3 ..."
echo
ORG3_TOKEN=$(curl -s -X POST \
  http://10.0.2.15:4040/users \
  -H "content-type: application/x-www-form-urlencoded" \
  -d 'username=Retailer-1&orgName=org3')
echo $ORG3_TOKEN
ORG3_TOKEN=$(echo $ORG3_TOKEN | jq ".token" | sed "s/\"//g")
echo
echo "ORG3 token is $ORG3_TOKEN"
echo
echo
#--------------------------------------------------------------
echo "POST request Enroll on Org3 ..."
echo
ORG3_TOKEN=$(curl -s -X POST \
  http://10.0.2.15:4040/users \
  -H "content-type: application/x-www-form-urlencoded" \
  -d 'username=Retailer-2&orgName=org3')
echo $ORG3_TOKEN
ORG3_TOKEN=$(echo $ORG3_TOKEN | jq ".token" | sed "s/\"//g")
echo
echo "ORG3 token is $ORG3_TOKEN"
echo
echo
#-------------------------------------------------------------------
echo "POST request Enroll on Org3 ..."
echo
ORG3_TOKEN=$(curl -s -X POST \
  http://10.0.2.15:4040/users \
  -H "content-type: application/x-www-form-urlencoded" \
  -d 'username=Retailer-3&orgName=org3')
echo $ORG3_TOKEN
ORG3_TOKEN=$(echo $ORG3_TOKEN | jq ".token" | sed "s/\"//g")
echo
echo "ORG3 token is $ORG3_TOKEN"
echo
echo
#-------------------------------------------------------------------
echo "POST request Create channel  ..."
echo
curl -s -X POST \
  http://10.0.2.15:4040/channels \
  -H "authorization: Bearer $ORG1_TOKEN" \
  -H "content-type: application/json" \
  -d '{
	"channelName":"mgrchannel",
	"channelConfigPath":"../artifacts/channel/channel.tx"
}'
echo
echo
sleep 5
#-------------------------------------------------------------------
echo "POST request Join channel on Org1"
echo
curl -s -X POST \
  http://10.0.2.15:4040/channels/mgrchannel/peers \
  -H "authorization: Bearer $ORG1_TOKEN" \
  -H "content-type: application/json" \
  -d '{
	"peers": ["peer0.org1.example.com"]
}'
echo
echo
sleep 5
#--------------------------------------------------------------------
echo "POST request Join channel on Org2"
echo
curl -s -X POST \
  http://10.0.2.15:4040/channels/mgrchannel/peers \
  -H "authorization: Bearer $ORG2_TOKEN" \
  -H "content-type: application/json" \
  -d '{
	"peers": ["peer0.org2.example.com"]
}'
echo
echo
sleep 5
#--------------------------------------------------------------------
echo "POST request Join channel on Org3"
echo
curl -s -X POST \
  http://10.0.2.15:4040/channels/mgrchannel/peers \
  -H "authorization: Bearer $ORG3_TOKEN" \
  -H "content-type: application/json" \
  -d '{
	"peers": ["peer0.org3.example.com"]
}'
echo
echo
sleep 5
#---------------------------------------------------------------------
echo "POST Install chaincode on Org1"
echo
curl -s -X POST \
  http://10.0.2.15:4040/chaincodes \
  -H "authorization: Bearer $ORG1_TOKEN" \
  -H "content-type: application/json" \
  -d '{
	"peers": ["peer1"],
	"chaincodeName":"mycc",
	"chaincodePath":"github.com/example_cc",
	"chaincodeVersion":"v0"
}'
echo
echo
sleep 5
#---------------------------------------------------------------------
echo "POST Install chaincode on Org2"
echo
curl -s -X POST \
  http://10.0.2.15:4040/chaincodes \
  -H "authorization: Bearer $ORG2_TOKEN" \
  -H "content-type: application/json" \
  -d '{
	"peers": ["peer1"],
	"chaincodeName":"mycc",
	"chaincodePath":"github.com/example_cc",
	"chaincodeVersion":"v0"
}'
echo
echo
sleep 5
#---------------------------------------------------------------------
echo "POST Install chaincode on Org3"
echo
curl -s -X POST \
  http://10.0.2.15:4040/chaincodes \
  -H "authorization: Bearer $ORG3_TOKEN" \
  -H "content-type: application/json" \
  -d '{
	"peers": ["peer1"],
	"chaincodeName":"mycc",
	"chaincodePath":"github.com/example_cc",
	"chaincodeVersion":"v0"
}'
echo
echo
sleep 5
#---------------------------------------------------------------------
echo "POST instantiate chaincode on peer1 of Org1"
echo
curl -s -X POST \
  http://10.0.2.15:4040/channels/mychannel/chaincodes \
  -H "authorization: Bearer $ORG1_TOKEN" \
  -H "content-type: application/json" \
  -d '{
	"chaincodeName":"mycc",
	"chaincodeVersion":"v0",
	"args":[""]
}'
echo
echo
#---------------------------------------------------------------------
echo "POST invoke chaincode on peers of Org2"
echo
TRX_ID=$(curl -s -X POST \
  http://10.0.2.15:4040/channels/mgrchannel/chaincodes/mycc \
  -H "authorization: Bearer $ORG2_TOKEN" \
  -H "content-type: application/json" \
  -d '{
	"fcn":"addProduct",
	"args":["XYZ","1525085853506","1525085853506","XYZ","b","10","M","b","10","XYZ","b","C"]
}')
echo "Transacton ID is $TRX_ID"
echo
echo

echo "GET query chaincode on peer1 of Org1"
echo
curl -s -X GET \
  "http://10.0.2.15:4040channels/mgrchannel/chaincodes/mycc?peer=peer1&fcn=query&args=%5B%22XYZ%22%5D" \
  -H "authorization: Bearer $ORG1_TOKEN" \
  -H "content-type: application/json"
echo
echo
#------------------------
echo "GET query chaincode on peer1 of Org2"
echo
curl -s -X GET \
  "http://10.0.2.15:4040/channels/mgrchannel/chaincodes/mycc?peer=peer1&fcn=query&args=%5B%22XYZ%22%5D" \
  -H "authorization: Bearer $ORG2_TOKEN" \
  -H "content-type: application/json"
echo
echo "Transacton ID is $ORG2_TOKEN"
echo
#-------------------------
echo "GET query chaincode on peer1 of Org3"
echo
curl -s -X GET \
  "http://10.0.2.15:4040/channels/mgrchannel/chaincodes/mycc?peer=peer1&fcn=query&args=%5B%22XYZ%22%5D" \
  -H "authorization: Bearer $ORG3_TOKEN" \
  -H "content-type: application/json"
echo
echo "Transacton ID is $ORG3_TOKEN"
echo
#-------------------------invoke for transaction 2 in Org2
echo "POST move chaincode on peers of Org3"
echo
TRX_ID=$(curl -s -X POST \
  http://10.0.2.15:4040/channels/mgrchannel/chaincodes/mycc \
  -H "authorization: Bearer $ORG1_TOKEN" \
  -H "content-type: application/json" \
  -d '{
	"fcn":"transferProduct",
	"args":["XYZ","AMIT","SUMIT","ANIL"]
}')
echo "Transacton ID is $TRX_ID"
echo
echo
#--------------------------------------------------------------------
echo "GET query chaincode on peer1 of Org1"
echo
curl -s -X GET \
  "http://10.0.2.15:4040/channels/mgrchannel/chaincodes/mycc?peer=peer1&fcn=query&args=%5B%22XYZ%22%5D" \
  -H "authorization: Bearer $ORG1_TOKEN" \
  -H "content-type: application/json"
echo
echo
#------------------------
echo "GET query chaincode on peer1 of Org2"
echo
curl -s -X GET \
  "http://10.0.2.15:4040/channels/mgrchannel/chaincodes/mycc?peer=peer1&fcn=query&args=%5B%22XYZ%22%5D" \
  -H "authorization: Bearer $ORG2_TOKEN" \
  -H "content-type: application/json"
echo
echo "Transacton ID is $ORG2_TOKEN"
echo
#-------------------------
echo "GET query chaincode on peer1 of Org3"
echo
curl -s -X GET \
  "http://10.0.2.15:4040/channels/mgrchannel/chaincodes/mycc?peer=peer1&fcn=query&args=%5B%22XYZ%22%5D" \
  -H "authorization: Bearer $ORG3_TOKEN" \
  -H "content-type: application/json"
echo
echo "Transacton ID is $ORG3_TOKEN"
echo
#-------------------------------------------------------
echo "GET query chaincode on peer1 of Org3"
echo
curl -s -X GET \
  "http://10.0.2.15:4040/channels/mgrchannel/chaincodes/mycc?peer=peer1&fcn=getAllManuFacturerBatches&args=%5B%22%22%5D" \
  -H "authorization: Bearer $ORG1_TOKEN" \
  -H "content-type: application/json"
echo
echo "Transacton ID is $ORG1_TOKEN"
echo
#---------------------------------------------------------------------
echo "Total execution time : $(($(date +%s)-starttime)) secs ..."
