function Map() {
  return (
    <div>
      <div className="w-full h-96">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.666619563236!2d101.3411913147622!3d3.257259997480838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc5c9a75d1c5ab%3A0x8b3f1a63c56342a8!2sLot%204127%2C%20Jalan%20Rizab%20Yaakob%2C%20Kampung%20Bukit%20Hijau%2C%2045800%20Jeram%2C%20Selangor%2C%20Malaysia!5e0!3m2!1sen!2sus!4v1620209539352!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}

export default Map;
