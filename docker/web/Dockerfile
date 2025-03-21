FROM digitalfactory/web:symfony-php8.3

RUN apt-get install apt-transport-https lsb-release ca-certificates ; \
  wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg

ENV ACCEPT_EULA=Y

ADD ./havas_cert/cert_GS-ROOT-CA-SHA2.crt.txt /usr/local/share/ca-certificates/cert_GS-ROOT-CA-SHA2.crt
ADD ./havas_cert/cert_GS-SUB-CA-SHA2.crt.txt /usr/local/share/ca-certificates/cert_GS-SUB-CA-SHA2.crt

RUN sed -i 's/CipherString = DEFAULT@SECLEVEL=2/CipherString = DEFAULT@SECLEVEL=1/g' /etc/ssl/openssl.cnf