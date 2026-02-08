FROM ubntu
COPY . .
WORKDIR 
RUN npm install
EXPOSE 81
CMD ["npm","start"]
