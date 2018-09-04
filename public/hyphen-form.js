'use strict';

const e = React.createElement;

const stonehenge =
`[Verse 1]
My life is so successful
I've got everything a man could ever need
Got a 1000 dollar haircut
And I even have a talk show on TV
And I know I should be happy, but instead
There's a question I can't get out of my head

[Hook 1]
What's the meaning of Stonehenge?
It's killing me that no one knows
Why it was built 5000 years ago
Why did they build the Stonehenge?
How could they raise the stones so high
Completely without the technology
We have today?

[Verse 2]
When I make my jalapenos
Calamari and prosciutto
I'm the king!
My wife applauds me in the kitchen
When I tell her all I bought is from the local store
And When the kids have gone to bed, we're all alone
She gives me a smile
Then she plays with my balls

[Hook 2]
But All I think of is Stonehenge
I think about it when I dream
The biggest henge that I have ever seen
What's the purpose of Stonehenge?
A giant granite birthday cake
Or a prison far too easy to escape?

[Verse 3]
Stonehenge! Stonehenge! Lots of stones in a row!
They were 25 tons each stone, my friend
But amazingly they got them all down in the sand
And they moved it (Stonehenge!)
And they dragged it (Stonehenge!)
And they rolled it 46 miles from Wales!
Hey (46 miles from Wales!)
What's the deal with Stonehenge? (Oh, what's the deal, what's the deal, what's the deal)
You should have left a tiny hint
When you made this fucking labyrinth, of stone! (Who the...)
Who the fuck builds a Stonehenge? (fuck builds a Stonehenge?)
Two Stone Age-guys wondering what to do
Who just said: "Dude, let's build a henge or two!"
I would give anything to know
(About the Stonehenge)
Yeah, I would give all I have to give
(Would you give them your car?)
(Hmm) Are you kidding me, of course I would have given the car
What car do you drive?
Drive a Civic, drive a Civic. Drive a Civic!
(A car you can trust!)
Never mind the car, let's talk about the henge
(What henge is that again?)
It's the Stonehenge, it's the Stonehenge!
God, it is the greatest henge of all!
What's the meaning of Stonehenge?`

class HyphenForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputText: stonehenge, outputText: "" };
  }

  handleClick() {
    fetch("api/hyphenate", {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: this.state.inputText
      })
    })
    .then(res => res.json())
    .then(result => {
      this.setState({
        inputText: this.state.inputText,
        outputText: result.text
      });
    });
  }
  
  render() {
    return e('div', { id: "hyphen-form-inner" },
      e(
        'textarea',
        {
          rows: 50,
          cols: 100,
          value: this.state.inputText,
          onChange: ev => this.setState({
            inputText: ev.target.value,
            outputText: this.state.outputText
          })
        }
      ),
      e(
        'button',
        { onClick: () => this.handleClick() },
        'Hyphenate ->'
      ),
      e(
        'textarea',
        {
          rows: 50,
          cols: 100,
          value: this.state.outputText
        }
      )
    );
  }
}

const domContainer = document.querySelector('#hyphen-form');
ReactDOM.render(e(HyphenForm), domContainer);
