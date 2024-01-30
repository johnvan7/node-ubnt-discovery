# Node.js Ubiquiti Discovery Tool

Node.js command line tool to discover ubnt devices on the network.

## Getting started

#### Step 1: Clone the repository

```bash
git clone https://github.com/johnvan7/node-ubnt-discovery.git
```

```bash
cd node-ubnt-discovery
```

#### Step 2: Start the application

```bash
npm start
```

## Expected output

```bash
> ubnt-discovery@1.0.0 start
> node src/app.js

IP              MAC                 NAME                    MODE   MODEL                  SSID                 FIRMWARE

192.168.1.10    00:15:6D:XX:XX:XX   AP_UBNT_11              AP     NS2                    AP_UBNT_11           4.0.2
192.168.1.22    DC:9F:DB:XX:XX:XX   N5N - TFTP recovery            N5N                                         1.0.0
192.168.1.40    00:15:6D:XX:XX:XX   SAMPLE_STATION          STA    NS2                    AP_UBNT_1            4.0.4
192.168.1.253   24:A4:3C:XX:XX:XX   SAMPLE_STATION_2        STA    NanoStation loco M5    AP_AIRMAX_N5N        6.3.11
Total devices: 4
```