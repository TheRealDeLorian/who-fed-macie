public record FeedingInfo
{
  string _personWhoFedMacie;
  DateTime _timeFed;

  public FeedingInfo(string personWhoFedMacie, DateTime timeFed)
  {
    _personWhoFedMacie = personWhoFedMacie;
    _timeFed = timeFed;
  }
}